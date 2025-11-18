export function front2back(categoriesObject) {
  if (!categoriesObject) return [];

  return Object.entries(categoriesObject)
    .filter(([, item]) => item != null && item.name) // name이 있는 유효한 아이템만 필터링
    .map(([typeKey, itemData]) => ({
      type: typeKey.toUpperCase(), // Prisma Enum과 맞추기 위해 대문자 처리
      name: itemData.name,
      brand: itemData.brand,
      price: itemData.price,
    }));
}

export function back2front(styles) {
  if (Array.isArray(styles)) {
    return styles.map((n) => {
      const categories = (n.categories || []).reduce((acc, cur) => {
        acc[cur.type.toLowerCase()] = {
          name: cur.name,
          brand: cur.brand,
          price: cur.price,
        };
        return acc;
      }, {});
      return { ...n, categories };
    });
  } else {
    const categories = (styles.categories || []).reduce((acc, cur) => {
      acc[cur.type.toLowerCase()] = {
        name: cur.name,
        brand: cur.brand,
        price: cur.price,
      };
      return acc;
    }, {});
    return { ...styles, categories };
  }
}

// 스타일 상세 조회 및 등록, 수정 용으로 만들어봤습니다.
function convertStyleToDetailFormat(rawStyleObject) {
  const categoriesObject = (rawStyleObject.categories || []).reduce((acc, cur) => {
    acc[cur.type.toLowerCase()] = {
      name: cur.name,
      brand: cur.brand,
      price: cur.price,
    };
    return acc;
  }, {});

  const detailResponse = {
    id: rawStyleObject.id,
    nickname: rawStyleObject.nickname,
    title: rawStyleObject.title,
    content: rawStyleObject.content,
    viewCount: rawStyleObject.viewCount,
    curationCount: rawStyleObject.curationCount,
    createdAt: rawStyleObject.createdAt,
    categories: categoriesObject,
    tags: rawStyleObject.tags,
    imageUrls: rawStyleObject.imageUrls,
  };

  return detailResponse;
}

export function formatStyleForDetail(data) {
  if (Array.isArray(data)) {
    return data.map(convertStyleToDetailFormat);
  } else {
    return convertStyleToDetailFormat(data);
  }
}

// 목록 출력시 요구하는 페이지 헤더 정보
export function pageInfoForList(page, pageSize, nStyles, nTotalStyles) {
  return {
    currentPage: parseInt(page),
    totalPage: Math.ceil(nTotalStyles / parseInt(pageSize)),
    totalItemCount: Math.max(nTotalStyles, nStyles),
  };
}
