// import { constructFromSymbol } from 'date-fns/constants';

// export function back2front(backEnd_style_categories) {
//   const categories = backEnd_style_categories.reduce((acc, cur) => {
//     acc[cur.type.toLowerCase()] = {
//       name: cur.name,
//       brand: cur.brand,
//       price: cur.price,
//     };
//     return acc;
//   }, {});
//   return categories;
// }

// 선영님이 만들어 주세요~
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
