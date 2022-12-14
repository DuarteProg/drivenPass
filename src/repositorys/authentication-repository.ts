import { prisma } from "@/config";
import { Prisma } from "@prisma/client";


async function findByEmail(email: string, select?: Prisma.UserSelect) {
    const params: Prisma.UserFindUniqueArgs = {
      where: {
        email,
      },
    };
  
    if (select) {
      params.select = select;
    }
  
    return prisma.user.findUnique(params);
  }
  
  async function createUser(data: Prisma.UserUncheckedCreateInput) {
    return prisma.user.create({
      data,
    });
  }


async function createSession(data: Prisma.SessionUncheckedCreateInput) {
  return prisma.session.create({
    data,
  });
}

const autheticationRepository = {
    createSession,
    createUser,
    findByEmail
};

export default autheticationRepository;
