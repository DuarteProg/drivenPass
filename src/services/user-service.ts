import { CreateUserParams } from "@/protocols";
import userRepository from "@/repositorys/user-repository";
import { User } from "@prisma/client";
import bcrypt from "bcrypt"
import { duplicatedEmailError } from "../errors/erros-service";


export async function createUser( email : string, password: string) {
  
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail.email) throw duplicatedEmailError();
  
    const hashedPassword = await bcrypt.hash(password, 12);
    
    return userRepository.create(email, hashedPassword);
  }
  
 

  const userService = {
    createUser,
  };

  export default userService;