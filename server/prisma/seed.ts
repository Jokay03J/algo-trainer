import { PrismaClient } from '@prisma/client';
import userSeed from './seed/user';
const prisma = new PrismaClient();
async function main() {
  await userSeed();
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
