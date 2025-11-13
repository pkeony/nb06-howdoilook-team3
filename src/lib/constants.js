import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const PUBLIC_PATH = path.resolve(process.cwd(), 'images'); //pc경로 루트디렉토리의 images
export const STATIC_PATH = '/images'; //url경로
