import { prisma } from "@/config";
import { Credential } from "@prisma/client";

export async function credentialTitle(userId: number, title: string) {
  return prisma.credential.findFirst({
    where: {
      userId,
      title,
    },
  });
}

export async function createCredential(
  userId: number,
  title: string,
  url: string,
  username: string,
  password: string
) {
  return prisma.credential.create({
    data: {
      userId,
      title,
      url,
      username,
      password,
    },
  });
}

export async function credentialId(id: number) {
  return prisma.credential.findFirst({
    where: {
      id,
    },
  });
}

async function credentialAll(userId: number) {
  return prisma.credential.findMany({
    where: {
      userId,
    },
  });
}

export async function deleteId(id: number) {
  await prisma.credential.delete({
    where: {
      id: id,
    },
  });
};


const credentialsRepository = {
  credentialAll,
  credentialId,
  credentialTitle,
  createCredential,
  deleteId
};

export default credentialsRepository;
