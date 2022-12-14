import app, { init } from "../../src/app";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { createUser, createCredential } from "../factory";
import { cleanDb, generateValidToken } from "../helpers";
import {
  Crypritografar,
  unCrypritografar,
} from "../../src/utils/cryptofrafado";
//import { prisma } from "@prisma/client";
import { prisma } from "../../src/config";

beforeAll(async () => {
  await init();
});
beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("GET /credential", () => {
  it("should respond with status 401 if has no token", async () => {
    const response = await server.get("/credential");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if token is wrong", async () => {
    const bearetoken = "Bearer " + faker.lorem.word(20);
    const response = await server
      .get("/credential")
      .set("Authorization", `Bearer ${bearetoken}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 400 if has no body", async () => {
      const bearetoken = await generateValidToken();

      const response = await server
        .post("/credential")
        .set("Authorization", `Bearer ${bearetoken}`);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    describe("when body is valid", () => {
      it("should respond with objects array when user has at least one credential", async () => {
        const generateValidBody = () => ({
          email: faker.internet.email(),
          password: faker.internet.password(10),
        });
        const body = generateValidBody();
        const user = await createUser(body);
        const token = await generateValidToken(user);
        const credential = await createCredential(user.id);
        const response = await server
          .get("/credential")
          .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: credential.id,
              title: credential.title,
              url: credential.url,
              username: credential.username,
              password: credential.password,
              userId: credential.userId,
            }),
          ])
        );
      });
    });
  });
});

describe("POST /credentials", () => {
  const createOtherBody = () => ({
    title: faker.lorem.word(2),
    url: faker.internet.url(),
    username: faker.name.firstName(),
    password: faker.internet.password(),
  });

  it("should respond with status 401 if has no token", async () => {
    const otherbody = createOtherBody();
    const response = await server.post("/credential").send(otherbody);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 when invalid token was sent", async () => {
    const otherbody = createOtherBody();
    const token = "Bearer " + faker.lorem.word(15);
    const response = await server
      .post("/credential")
      .set({ Authorization: token })
      .send(otherbody);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when body is valid", () => {
    const generateValidBody = () => ({
      email: faker.internet.email(),
      password: faker.internet.password(10),
    });

    it("should respond with status 400 when existing title was sent", async () => {
      const body = {
        email: faker.internet.email(),
        password: faker.internet.password(10),
      };
      const user = await createUser(body);
      const token = await generateValidToken(user);
      const createOtherBody = () => ({
        title: faker.lorem.word(2),
        url: faker.internet.url(),
        username: faker.name.firstName(),
        password: faker.internet.password(),
      });
      const credential = await createCredential(user.id);

      const response = await server
        .post("/credential")
        .set("Authorization", `Bearer ${token}`)
        .send({ ...createOtherBody, title: credential.title });

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
  });
});
