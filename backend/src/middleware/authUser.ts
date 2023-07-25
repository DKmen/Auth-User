import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../util";
import dataSource from "../db/connect";
import { User } from "../db/model/user.model";
import catchError from "../util/catchError";

export default catchError(async function Auth(req: Request & { user: any }, res: Response, next: NextFunction) {
    let { token } = req.cookies;


    if (!token) {
        throw Error("Provide valid token")
    }

    const decodedData = verifyToken(token);
    const userRepo = dataSource.getRepository<User>(User);

    const user = await userRepo.findOne({
        where: {
            id: decodedData.id
        }
    })

    if (!user) {

    }

    req.user = user;
    next();
})