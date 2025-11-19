import path from 'path';

export const PORT = process.env.PORT;
export const PUBLIC_PATH = path.resolve(process.cwd(), 'uploads'); //pc경로 루트디렉토리의 images
export const STATIC_PATH = '/images'; //url경로
