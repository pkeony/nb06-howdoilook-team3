import { PrismaClient } from '@prisma/client';
import { Styles, Categories, Curations, Comments } from './mock.js';

const prisma = new PrismaClient();

async function main() {
  await prisma.comment.deleteMany();
<<<<<<< HEAD
  //   await prisma.$executeRawUnsafe(`
  //   TRUNCATE TABLE "Comment", "Curation", "Category", "Style" RESTART IDENTITY CASCADE;
  // `);
=======
  await prisma.curation.deleteMany();
  await prisma.category.deleteMany();
  await prisma.style.deleteMany();

>>>>>>> dev
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
  await prisma.$executeRawUnsafe(`
  SELECT setval(pg_get_serial_sequence('"Style"', 'id'), COALESCE((SELECT MAX(id) FROM "Style"), 0), true);
`);
  await prisma.$executeRawUnsafe(`
  SELECT setval(pg_get_serial_sequence('"Category"', 'id'), COALESCE((SELECT MAX(id) FROM "Category"), 0), true);
`);
  await prisma.$executeRawUnsafe(`
  SELECT setval(pg_get_serial_sequence('"Curation"', 'id'), COALESCE((SELECT MAX(id) FROM "Curation"), 0), true);
`);
  await prisma.$executeRawUnsafe(`
  SELECT setval(pg_get_serial_sequence('"Comment"', 'id'), COALESCE((SELECT MAX(id) FROM "Comment"), 0), true);
`);

<<<<<<< HEAD
=======
<<<<<<< HEAD
  await prisma.$executeRawUnsafe(`
  SELECT setval(pg_get_serial_sequence('"Style"', 'id'), COALESCE((SELECT MAX(id) FROM "Style"), 0), true);
`);
  await prisma.$executeRawUnsafe(`
  SELECT setval(pg_get_serial_sequence('"Category"', 'id'), COALESCE((SELECT MAX(id) FROM "Category"), 0), true);
`);
  await prisma.$executeRawUnsafe(`
  SELECT setval(pg_get_serial_sequence('"Curation"', 'id'), COALESCE((SELECT MAX(id) FROM "Curation"), 0), true);
`);
  await prisma.$executeRawUnsafe(`
  SELECT setval(pg_get_serial_sequence('"Comment"', 'id'), COALESCE((SELECT MAX(id) FROM "Comment"), 0), true);
`);
=======
>>>>>>> dev
  // await prisma.$executeRawUnsafe(`
  //   SELECT setval(pg_get_serial_sequence('"Style"', 'id'), COALESCE((SELECT MAX(id) FROM "Style"), 0), true);
  // `);
  // await prisma.$executeRawUnsafe(`
  //   SELECT setval(pg_get_serial_sequence('"Curation"', 'id'), COALESCE((SELECT MAX(id) FROM "Curation"), 0), true);
  // `);
  // await prisma.$executeRawUnsafe(`
  //   SELECT setval(pg_get_serial_sequence('"Comment"', 'id'), COALESCE((SELECT MAX(id) FROM "Comment"), 0), true);
  // `);
<<<<<<< HEAD
=======
>>>>>>> 2528db5 (merge dev)
>>>>>>> dev
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1); // 프로세스를 종료시킬거라는 명령어
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
