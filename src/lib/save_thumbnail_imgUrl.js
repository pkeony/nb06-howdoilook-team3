// 시딩 mock data를 위한 thumbnail imageUrl 생성 및 저장
export function save_thumbnail_imgUrl(styles) {
  return styles.map((n) => {
    n.thumbnail = n.imageUrls[0] + '_tn';
    const { imageUrls, ...rest } = n; // thumbnail 보여줄 때는 imageUrls은 안 보여줌
    return rest;
  });
}
