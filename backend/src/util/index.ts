import { sign, verify } from "jsonwebtoken";
import { genSaltSync, hashSync, compareSync } from "bcryptjs"

export const generateToken = (id: string) => {
    return sign({ id: id }, process.env.SECRATE || "Sectat")
}

export const verifyToken = (token: string): { id: string } => {
    return verify(token, process.env.SECRATE || "Sectat") as { id: string }
}

export const encrypt = (txt: string): string => {
    const salt = genSaltSync(parseInt(process.env.SALT) || 10);
    return hashSync(txt, salt);
}

export const compare = (has: string, txt: string): boolean => {
    return compareSync(txt, has)
}