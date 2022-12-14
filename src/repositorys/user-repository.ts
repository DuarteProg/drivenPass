import { prisma } from "@/config";

async function findByEmail(email: string) {
  return prisma.user.findFirst({
    where: {
      email
    }, 

  });

}

async function create(email: string, password: string) {
  return prisma.user.create({
    data:{
      email,
      password
    }

  });
}

const userRepository = {
  findByEmail,
  create,
};

export default userRepository;