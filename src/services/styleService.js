import { prisma } from '../lib/prismaClient.js';
import NotFoundError from '../lib/errors/NotFoundError.js';
import { front2back, formatStyleForDetail } from '../lib/commonFn.js';

// 스타일 등록
export const createStyleService = async (styleData) => {
  const { id, ...dataWithoutId } = styleData;

  const categoriesArray = front2back(dataWithoutId.categories);

  const newStyleFromDB = await prisma.style.create({
    data: {
      nickname: dataWithoutId.nickname,
      title: dataWithoutId.title,
      content: dataWithoutId.content,
      password: dataWithoutId.password,
      tags: dataWithoutId.tags,
      imageUrls: dataWithoutId.imageUrls,
      categories: {
        create: categoriesArray,
      },
      viewCount: 0,
      curationCount: 0,
      thumbnail: dataWithoutId.imageUrls[0],
    },
    include: {
      categories: {
        select: {
          type: true,
          name: true,
          brand: true,
          price: true,
        },
      },
    },
  });

  return formatStyleForDetail(newStyleFromDB);
};

// 스타일 수정
export const updateStyleService = async (styleId, updateData) => {
  const { nickname, title, content, password, categories, tags, imageUrls } = updateData;
  const parsedStyleId = parseInt(styleId);

  const style = await prisma.style.findUnique({
    where: { id: parsedStyleId },
  });

  if (!style) {
    throw new NotFoundError('Style', parsedStyleId);
  }

  if (style.password !== password) {
    throw new Error('FORBIDDEN');
  }

  const categoryData = front2back(categories);

  const [deleteResult, updatedStyleFromDB] = await prisma.$transaction([
    prisma.category.deleteMany({
      where: { styleId: parsedStyleId },
    }),
    prisma.style.update({
      where: { id: parsedStyleId },
      data: {
        nickname,
        title,
        content,
        tags: tags,
        imageUrls: imageUrls,
        thumbnail: imageUrls && imageUrls.length > 0 ? imageUrls[0] : undefined,
        categories: {
          create: categoryData,
        },
      },
      include: {
        categories: {
          select: {
            type: true,
            name: true,
            brand: true,
            price: true,
          },
        },
      },
    }),
  ]);

  return formatStyleForDetail(updatedStyleFromDB);
};

// 스타일 삭제
export const deleteStyleService = async (styleId, password) => {
  const parsedStyleId = parseInt(styleId);

  // 1. 비밀번호 검증을 위해 스타일 조회
  const style = await prisma.style.findUnique({
    where: { id: parsedStyleId },
  });

  if (!style) {
    throw new NotFoundError('Style', parsedStyleId);
  }

  // 2. 비밀번호 일치 확인
  if (style.password !== password) {
    throw new Error('FORBIDDEN'); // 403
  }

  // 3. 스타일 삭제
  await prisma.style.delete({
    where: { id: parsedStyleId },
  });

  return;
};
