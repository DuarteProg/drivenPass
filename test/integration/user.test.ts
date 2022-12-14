import app, { init } from "../../src/app";
import { prisma } from "../../src/config";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { cleanDb } from "../helpers";
import { createUser } from "../factory";
import { duplicatedEmailError } from "../../src/errors/erros-service"


beforeAll(async () => {
    await init();
    await cleanDb();
  });
  
  const server = supertest(app);
  
  describe("POST /users", () => {
    const generateValidBody = () => ({
      email: faker.internet.email(),
      password: faker.internet.password(10),
    });
    
    it("should respond with status 400 when body is not given", async () => {
      const response = await server.post("/users");
  
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
  
    it("should respond with status 400 when body is not valid", async () => {
      const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
  
      const response = await server.post("/users").send(invalidBody);
  
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 409 when there is an user with given email", async () => {
      const body = generateValidBody();
      await createUser(body);

      const response = await server.post("/users").send(body);

      expect(response.status).toBe(httpStatus.CONFLICT);
      expect(response.body).toEqual(duplicatedEmailError());
    });
    it("should respond with status 400 if send a wrong email", async () => {
      
    });
  
    // describe("when body is valid", () => {
  
    //   describe("when event started", () => {
  
    //     it("should respond with status 201 and create user when given email is unique", async () => {
    //       const body = generateValidBody();
  
    //       const response = await server.post("/users").send(body);
  
    //       expect(response.status).toBe(httpStatus.CREATED);
    //       expect(response.body).toEqual({
    //         id: expect.any(Number),
    //         email: body.email,
    //       });
    //     });
  
    //     it("should save user on db", async () => {
    //       const body = generateValidBody();
  
    //       const response = await server.post("/users").send(body);
  
    //       const user = await prisma.user.findUnique({
    //         where: { email: body.email },
    //       });
    //       expect(user).toEqual(
    //         expect.objectContaining({
    //           id: response.body.id,
    //           email: body.email,
    //         }),
    //       );
    //     });
    //   });
    // });
  });
  