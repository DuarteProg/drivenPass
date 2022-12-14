import { Credential } from "@prisma/client";
import Cryptr from "cryptr"


import { conflictError, hasnoid, notFoundError, unauthorizedError } from "@/errors";
import credentialsRepository, { credentialTitle } from "@/repositorys/credentials-repository";
import { Crypritografar, unCrypritografar } from "@/utils/cryptofrafado";
import { duplicatedtitleError } from "../errors/erros-service";
import NetworkRepository from "@/repositorys/network-repository";

export async function getAllNetwork (userId: number){
    
    const response = await NetworkRepository.networkAll(userId);
    return response
};

export async function networkById (userId:number, id: number){
    const network = await NetworkRepository.networkId(id);
    if(!network)throw notFoundError();

    if(userId === network.userId)throw unauthorizedError();

    const decryptedCredential = unCrypritografar(network.password)
    return {
        title: network.title,
        network: network.network,
        password: decryptedCredential
    }
};

export async function createNetwork(userId: number, title: string, network: string, password: string){
    const neetwork = await NetworkRepository.createNetwork(userId, title, network, password);
    
    const decryptedNetwork = Crypritografar(neetwork.password)
    return {
        user: neetwork.userId,
        title: neetwork.title,
        network: neetwork.network,
        password: decryptedNetwork
    }
};

export async function deleteNetworkId(userId:number, id: number){
   const neetwork = await NetworkRepository.networkId(id);
   if(!neetwork)throw notFoundError();
   if(id !== neetwork.id)throw hasnoid()
   const deleted = await credentialsRepository.deleteId(id);
   return deleted
};



const networkService = {
    getAllNetwork,
    networkById,
    createNetwork,
    deleteNetworkId
  };
  
  export default networkService;