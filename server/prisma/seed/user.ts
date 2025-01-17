import { PrismaClient, Roles } from '@prisma/client';
import { hash } from 'argon2';
const prisma = new PrismaClient();
const main = async () => {
  const password = await hash('root');
  await prisma.user.upsert({
    where: {
      email: 'root@root.com',
    },
    update: {
      role: Roles.ADMIN,
      password,
    },
    create: {
      role: Roles.ADMIN,
      email: 'root@root.com',
      password,
    },
  });
};

export default main;
