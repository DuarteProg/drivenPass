import { Credential } from "@prisma/client";
import Cryptr from "cryptr"


import { conflictError, hasnoid, notFoundError, unauthorizedError } from "@/errors";
import credentialsRepository, { credentialTitle } from "@/repositorys/credentials-repository";
import { Crypritografar, unCrypritografar } from "@/utils/cryptofrafado";
import { duplicatedtitleError } from "../errors/erros-service";

async function getAllCredentials (userId: number){
    
    const response = await credentialsRepository.credentialAll(userId);
    console.log(response)
    return response
};

export async function CredentialById (userId:number, id: number){
    const credential = await credentialsRepository.credentialId(id);
    if(!credential)throw notFoundError();

    if(userId === credential.userId)throw unauthorizedError();

    const decryptedCredential = unCrypritografar(credential.password)
    return {
        user: credential.userId,
        title: credential.title,
        url: credential.url,
        username: credential.username,
        password: decryptedCredential
    }
};

export async function createCredential(userId: number, title: string, url: string, username: string, password: string){
    const credential = await credentialsRepository.createCredential(userId, title, url, username, password);
    
    const decryptedCredential = Crypritografar(credential.password)
    return {
        user: credential.userId,
        title: credential.title,
        url: credential.url,
        username: credential.username,
        password: decryptedCredential
    }
};

export async function validateTitle(userId: number, title: string){
    const validation = await credentialsRepository.credentialTitle(userId, title)
    if(validation.title) throw duplicatedtitleError();
    return validation;
}

export async function deleteCredentialId(userId:number, id: number){
   const Credential = await credentialsRepository.credentialId(userId);
   if(!Credential)throw notFoundError();
   if(id !== Credential.id)throw hasnoid()

   const deleted = await credentialsRepository.deleteId(id);
   return deleted
};



const credentialsService = {
    getAllCredentials,
    CredentialById,
    validateTitle,
    createCredential,
    deleteCredentialId
  };
  
  export default credentialsService;