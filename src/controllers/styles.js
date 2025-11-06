import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import { pageInfo } from '../services/pageInfo.js';

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

export async function getStylesList(req, res) {
  const { page = 1, pageSize = 10, sortBy = 'recent', searchBy, keyword, tag } = req.query;

  let orderBy;
  switch (sortBy) {
    case 'latest':
      orderBy = { createdAt: 'desc' };
      break;
    case 'mostViewed':
      orderBy = { viewCount: 'desc' };
      break;
    case 'mostCurated':
      orderBy = { curationCount: 'desc' };
      break;
    default:
      orderBy = { createdAt: 'desc' };
  }

  // function keywordSearch(searchByStr, keywordStr) {
  //   return { searchByStr: { contains: keywordStr } };
  // }
  // const searchWhere = keywordSearch(searchBy, keyword);
  // console.log(searchWhere);

  let searchWhere;
  switch (searchBy) {
    case 'nickname':
      searchWhere = { nickname: { contains: keyword } };
      break;
    case 'title':
      searchWhere = { title: { contains: keyword } };
      break;
    case 'content':
      searchWhere = { content: { contains: keyword } };
      break;
    case 'tag': // not working currently
      searchWhere = { tags: { hasSome: tag } };
      //   searchWhere = { tags: { some: { name: { contains: keyword } } } };
      break;
    default:
      searchWhere = { undefined: undefined };
  }

  const styles = await prisma.styles.findMany({
    where: {
      ...searchWhere,
      //tags: { hasSome: tag }, // not working
    },
    orderBy,
    omit: {
      password: true,
      updatedAt: true,
      imageUrls: true,
    },
    include: {
      categories: true,
      // curations: true,
    },
  });
  if (styles.length) {
    const myPage = pageInfo(page, pageSize, styles.length);
    const results = {
      currentPage: myPage.currPage,
      totalPage: myPage.totalPage,
      totalItemCount: myPage.totalItemCount,
      data: styles.slice(myPage.startItem, myPage.endItem + 1),
    };
    res.status(200).send(results);
  } else {
    res.status(200).send('No styles retrived.'); // 정상수행: 검색되는 결과가 없음
  }
}

export async function getStyles(req, res) {
  const id = Number(req.params.id);
  const style = await prisma.styles.findUniqueOrThrow({
    where: { id },
    include: {
      password: false,
      updatedAt: false,
      categories: { select: { type: true, name: true, brand: true, price: true } },
      curations: true,
    },
  });
  res.status(200).send(style);
}
