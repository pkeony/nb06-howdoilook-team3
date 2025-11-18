import { PrismaClient } from '@prisma/client';
import { Styles, Categories, Curations, Comments } from './mock.js';

const prisma = new PrismaClient();

async function main() {
  await prisma.style.deleteMany();
  await prisma.category.deleteMany();
  await prisma.curation.deleteMany();
  await prisma.comment.deleteMany();

  await prisma.style.createMany({
    data: Styles,
    skipDuplicates: true,
  });
  await prisma.category.createMany({
    data: Categories,
    skipDuplicates: true,
  });
  await prisma.curation.createMany({
    data: Curations,
    skipDuplicates: true,
  });
  await prisma.comment.createMany({
    data: Comments,
    skipDuplicates: true,
  });
}

await prisma.$executeRawUnsafe(`
    SELECT setval(pg_get_serial_sequence('"Style"', 'id'), (SELECT MAX(id) FROM "Style"));
  `);
await prisma.$executeRawUnsafe(`
    SELECT setval(pg_get_serial_sequence('"Curation"', 'id'), (SELECT MAX(id) FROM "Curation"));
  `);
await prisma.$executeRawUnsafe(`
    SELECT setval(pg_get_serial_sequence('"Comment"', 'id'), (SELECT MAX(id) FROM "Comment"));
  `);

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1); // 프로세스를 종료시킬거라는 명령어
  });
