// 스타일 목록 출력시 요구하는 헤더 정보가 포함된 스타일 데이터 리턴
import { back2front } from './catetory_conversion.js';

export function pageInfo(pageStr, pageSizeStr, styles) {
  return {
    currentPage: parseInt(pageStr),
    totalPage: Math.ceil(styles.length / parseInt(pageSizeStr)),
    totalItemCount: styles.length,
    data: back2front(styles),
  };
}
