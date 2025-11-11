export function back2front(backEnd_style_categories) {
  const categories = backEnd_style_categories.reduce((acc, cur) => {
    acc[cur.type.toLowerCase()] = {
      name: cur.name,
      brand: cur.brand,
      price: cur.price,
    };
    return acc;
  }, {});
  return categories;
}

export function back2front2(styles) {
  const arr = Array.isArray(styles) ? styles : [styles]; // ← 항상 배열로 통일

  return styles.map((n) => {
    console.log(n, Array.isArray(n.categories));
    const categories = categories.reduce((acc, cur) => {
      acc[cur.type.toLowerCase()] = {
        name: cur.name,
        brand: cur.brand,
        price: cur.price,
      };
      return acc;
    }, {});

    return {
      ...n,
      categories, // categories 배열 대신 객체로 대체
    };
  });
}

export function front2back(frontEnd_style) {
  const { categories, ...rest } = frontEnd_style.categories;
  const backEnd_categories = Object.entries(categories)
    .filter(([key, value]) => value != null && value.name)
    .map(([type, details]) => {
      return {
        type,
        name: details.name,
        brand: details.brand,
        price: details.price,
      };
    });
  const backEnd_style = { ...rest, backEnd_categories };
  return backEnd_style;
}
