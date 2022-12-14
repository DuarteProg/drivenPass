import { faker } from "@faker-js/faker";
import { Credential } from "@prisma/client";
import { prisma } from "../../src/config";

export async function createCredential(userId: number): Promise<Credential> {
  return prisma.credential.create({
    data: {
      title: faker.name.firstName(),
      url: faker.internet.url(),
      username: faker.name.lastName(),
      password: faker.internet.password(10),
      userId,
    },
  });
}
