import { prisma } from '../lib/prismaClient.js';
import NotFoundError from '../lib/errors/NotFoundError.js';
import { front2back, formatStyleForDetail, back2front, pageInfoForList } from '../lib/commonFn.js';
import BadRequestError from '../lib/errors/BadRequestError.js';

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
        create: categoriesArray
      },
      viewCount: 0,
      curationCount: 0,
      thumbnail: dataWithoutId.imageUrls[0]
    },
    include: {
      categories: {
        select: {
          type: true,
          name: true,
          brand: true,
          price: true
        }
      }
    }
  });

  return formatStyleForDetail(newStyleFromDB);
};

// 스타일 수정
export const updateStyleService = async (styleId, updateData) => {
  const { nickname, title, content, password, categories, tags, imageUrls } = updateData;
  const parsedStyleId = parseInt(styleId);

  const style = await prisma.style.findUnique({
    where: { id: parsedStyleId }
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
      where: { styleId: parsedStyleId }
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
          create: categoryData
        }
      },
      include: {
        categories: {
          select: {
            type: true,
            name: true,
            brand: true,
            price: true
          }
        }
      }
    })
  ]);

  return formatStyleForDetail(updatedStyleFromDB);
};

// 스타일 삭제
export const deleteStyleService = async (styleId, password) => {
  const parsedStyleId = parseInt(styleId);

  // 1. 비밀번호 검증을 위해 스타일 조회
  const style = await prisma.style.findUnique({
    where: { id: parsedStyleId }
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
    where: { id: parsedStyleId }
  });

  return;
};

// 스타일 상세 조회
export async function getStyleService(styleId) {
  let style = await prisma.style.findUniqueOrThrow({
    where: { id: parseInt(styleId) },
    select: { viewCount: true }
  });
  if (!style) {
    console.log(`0 style fetched`);
    throw new NotFoundError('Style', parseInt(styleId));
  }

  const count = ++style.viewCount;

  style = await prisma.style.update({
    where: { id: parseInt(styleId) },
    data: { viewCount: count },
    select: {
      id: true,
      nickname: true,
      title: true,
      content: true,
      viewCount: true,
      curationCount: true,
      createdAt: true,
      categories: { select: { type: true, name: true, brand: true, price: true } },
      tags: true,
      imageUrls: true
    }
  });

  console.log('1 style fetched (detail)');
  const frontEnd_style = back2front(style);
  return frontEnd_style;
}

// 스타일 목록 조회
// sortBy=latest/oldest
// searchBy=nickname/title/content/tag & keyword = yourKW
// tags=yourTag
export async function getStyleListService(reqQuery) {
  const { page = 1, pageSize = 10, sortBy = 'latest', searchBy, keyword, tag } = reqQuery;

  let orderBy;
  switch (sortBy) {
    case 'latest':
      orderBy = { createdAt: 'desc' };
      break;
    case 'oldest':
      orderBy = { createdAt: 'asc' };
      break;
    case 'mostViewed':
      orderBy = { viewCount: 'desc' };
      break;
    case 'mostCurated':
      orderBy = { curationCount: 'desc' };
      break;
    default:
      throw new BadRequestError('잘못된 요청입니다.');
  }

  let searchWhere;
  if (searchBy) {
    searchWhere = {
      // 그냥 두면 AND search
      // (sortBy를 동시에 2번 부르는 것은 불가능하지만 그래도 명시)
      OR: [
        { nickname: { contains: keyword } },
        { title: { contains: keyword } },
        { content: { contains: keyword } },
        { tags: { has: keyword } }
      ]
    };
  }

  //nTotalStyles: 총 스타일 수 in DB
  const nTotalStyles = await prisma.style.count({
    where: {
      ...(searchWhere || {}),
      ...(tag ? { tags: { has: tag } } : {})
    }
  });

  const styles = await prisma.style.findMany({
    where: {
      ...(searchWhere || {}),
      ...(tag ? { tags: { has: tag } } : {}) // tags와 sortBy 는 AND search 가능
    },
    take: parseInt(pageSize),
    skip: (parseInt(page) - 1) * parseInt(pageSize),
    orderBy,
    select: {
      id: true,
      thumbnail: true,
      nickname: true,
      title: true,
      tags: true,
      categories: { select: { type: true, name: true, brand: true, price: true } },
      content: true,
      viewCount: true,
      curationCount: true,
      createdAt: true
    }
  });

  if (!styles.length) {
    console.log(`0 styles fetched`);
    throw new BadRequestError('잘못된 요청입니다.');
  }

  const formattedStyles = {
    ...pageInfoForList(page, pageSize, styles.length, nTotalStyles),
    data: back2front(styles)
  };

  console.log(`${styles.length} styles fetched`);
  return formattedStyles;
}
