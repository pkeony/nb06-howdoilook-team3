import { prisma } from '../lib/prismaClient.js';
import NotFoundError from '../lib/errors/NotFoundError.js';

// 스타일 등록
const formatCategoriesAsObject = (categoriesArray) => {
  if (!categoriesArray || categoriesArray.length === 0) return {};

  return categoriesArray.reduce((acc, category) => {
    const { type, ...itemData } = category;

    // 리스폰스 예시에 type 필드가 소문자여서 소문자 키로 사용하여 객체에 추가
    if (type) {
      acc[type.toLowerCase()] = itemData;
    }
    return acc;
  }, {});
};

export const createStyleService = async (styleData) => {
  const { id, ...dataWithoutId } = styleData;

  const categoriesArray = Object.entries(dataWithoutId.categories)
    .filter(([, item]) => item !== undefined && item !== null)
    .map(([typeKey, itemData]) => ({
      type: typeKey.toUpperCase(),
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
          type: true,
          name: true,
          brand: true,
          price: true,
        },
      },
    },
  });
  const { categories: rawCategories, password, ...styleBase } = newStyle;

  return {
    ...styleBase,
    categories: formatCategoriesAsObject(rawCategories),
  };
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

  const categoryData = Object.entries(categories)
    .filter(([key, value]) => value != null && value.name)
    .map(([type, details]) => {
      return {
        type: type.toUpperCase(),
        name: details.name,
        brand: details.brand,
        price: details.price,
      };
    });

  const [deleteResult, updatedStyle] = await prisma.$transaction([
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

  const { categories: rawCategories, password: _, ...updatedStyleBase } = updatedStyle;

  return {
    ...updatedStyleBase,
    categories: formatCategoriesAsObject(rawCategories),
  };
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
