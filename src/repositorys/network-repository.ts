import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

// export async function credentialTitle(userId: number, title: string) {
//   return prisma.network.findFirst({
//     where: {
//       userId,
//       title,
//     },
//   });
// }

export async function createNetwork(
  userId: number,
  title: string,
  network: string,
  password: string
) {
  return prisma.network.create({
    data: {
      userId,
      title,
      network,
      password
    },
  });
}

export async function networkId(id: number) {
  return prisma.network.findFirst({
    where: {
      id,
    },
  });
}

async function networkAll(userId: number) {
  return prisma.network.findMany({
    where: {
      userId,
    },
  });
}

export async function deleteId(id: number) {
  await prisma.network.delete({
    where: {
        id,
    },
  });
}

const NetworkRepository = {
  networkAll,
  networkId,
  createNetwork,
  deleteId
};

export default NetworkRepository;
