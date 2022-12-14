import Cryptr from "cryptr"
import dotenv from "dotenv"

dotenv.config();

function configCriptr() {
const cript = new Cryptr(process.env.KEY_CRYPTR)
return cript;
}

export function Crypritografar(any: string){
const cript = configCriptr();
return cript.encrypt(any)
};

export function unCrypritografar(any: string){
    const descript = configCriptr();
    return descript.decrypt(any)
}

