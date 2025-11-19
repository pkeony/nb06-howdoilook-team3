import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { PUBLIC_PATH, STATIC_PATH } from '../lib/constants.js';
import BadRequestError from '../lib/errors/BadRequestError.js';

const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];
const FILE_SIZE_LIMIT = 5 * 1024 * 1024;

if (!fs.existsSync(PUBLIC_PATH)) {
  //폴더 있는지 확인
  fs.mkdirSync(PUBLIC_PATH, { recursive: true });
  console.log('uploads폴더가 만들어졌습니다.');
}

export const upload = multer({
  // multer 인스터스 생성 -> 라우터에서 미들웨어로 사용
  storage: multer.diskStorage({
    // 업로드된 파일 디스크에 저장하도록 설정
    destination(req, file, cb) {
      // 업로드될 파일이 저장 디스크 경로 결정
      cb(null, PUBLIC_PATH);
    },
    filename(req, file, cb) {
      // 저장할 파일 이름 결정
      cb(null, file.originalname); //원래이름 그대로 설정
    }
  }),
  limits: {
    // 파일 크기 제한
    fileSize: FILE_SIZE_LIMIT
  },

  fileFilter: function (req, file, cb) {
    //파일 확장자 확인
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      const err = new BadRequestError('png, jpeg, jpg 확장자만 가능합니다.');
      return cb(err);
    }

    cb(null, true);
  }
});

export async function uploadImage(req, res) {
  // 업로드된 파일을 접근 가능한 URL생성해서 응답으로 반환
  const protocol = req.protocol;
  const host = req.get('host'); //요청의 Host 헤더 값 가져옴
  const imageUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
  //path.posix.join() : 여러개의 문자열 인자를 받아 하나의 경로 문자열로 만듬(운영체제에 관계없이 일관된 경로형식 유지)
  return res.send({ imageUrl });
}
