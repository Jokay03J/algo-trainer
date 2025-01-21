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
      role: Roles.TEACHER,
      password,
    },
    create: {
      role: Roles.TEACHER,
      email: 'root@root.com',
      password,
    },
  });
  await prisma.user.upsert({
    where: {
      email: 'root2@root.com',
    },
    update: {
      role: Roles.STUDENT,
      password,
    },
    create: {
      role: Roles.STUDENT,
      email: 'root2@root.com',
      password,
    },
  });
};

export default main;
