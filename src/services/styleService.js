import { prisma } from '../lib/prismaClient.js';

// 스타일 등록
export const createStyleService = async (styleData) => {
  const { id, ...dataWithoutId } = styleData;
  const categoriesArray = Object.entries(dataWithoutId.categories)
    .filter(([, item]) => item !== undefined && item !== null)
    .map(([typeKey, itemData]) => ({
      type: typeKey,
      name: itemData.name,
      brand: itemData.brand,
      price: itemData.price,
    }));

  const newStyle = await prisma.style.create({
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
          name: true,
          brand: true,
          price: true,
        },
      },
    },
  });

  return newStyle;
};

// 스타일 수정
export const updateStyleService = async (styleId, updateData) => {
  const { nickname, title, content, password, categories, tags, imageUrls } = updateData;
  const style = await prisma.style.findUnique({
    where: { id: parseInt(styleId) },
  });

  if (!style) {
    throw new Error('NOT_FOUND');
  }

  if (style.password !== password) {
    throw new Error('FORBIDDEN');
  }

  const categoryData = Object.entries(categories)
    .filter(([key, value]) => value != null && value.name)
    .map(([type, details]) => {
      return {
        type,
        name: details.name,
        brand: details.brand,
        price: details.price,
      };
    });

  const [deleteResult, updatedStyle] = await prisma.$transaction([
    prisma.category.deleteMany({
      where: { styleId: parseInt(styleId) },
    }),
    prisma.style.update({
      where: { id: parseInt(styleId) },
      data: {
        nickname,
        title,
        content,
        tags: tags,
        imageUrls: imageUrls,
        categories: {
          create: categoryData,
        },
      },
      include: {
        categories: true,
      },
    }),
  ]);

  return updatedStyle;
};

// 스타일 삭제
export const deleteStyleService = async (styleId, password) => {
  // 1. 비밀번호 검증을 위해 스타일 조회
  const style = await prisma.style.findUnique({
    where: { id: parseInt(styleId) },
  });

  if (!style) {
    throw new Error('NOT_FOUND'); // 404
  }

  // 2. 비밀번호 일치 확인
  if (style.password !== password) {
    throw new Error('FORBIDDEN'); // 403
  }

  // 3. 스타일 삭제
  await prisma.style.delete({
    where: { id: parseInt(styleId) },
  });

  return;
};
