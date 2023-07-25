import { NextFunction, Request, Response } from "express";
import * as userService from "../service/use.service";
import UserDto from "../service/dto/userDto";
import catchError from "../util/catchError";

export const getUser = catchError(
    (req: Request & { user: any }, res: Response, next: NextFunction) => {
        res.status(200).json({
            error: false,
            user: req.user,
        });
    }
);
export const createUser = catchError(async (
    req: Request<any, UserDto>,
    res: Response,
    next: NextFunction
) => {
    const user = await userService.createUser(req.body);

    res.cookie("token", user.token);
    res.status(200).json({
        error: false,
        user: user.user,
    });
})

export const updateUser = catchError(async (
    req: Request & { user: any },
    res: Response,
    next: NextFunction
) => {
    const updateUser = await userService.updateUser(req.body, req.user.id);

    res.status(200).json({
        error: false,
        user: updateUser.user,
    });
});

export const loginUser = catchError(async (
    req: Request<any, { email: string; password: string }>,
    res: Response,
    next: NextFunction
) => {
    const user = await userService.loginUser(req.body.email, req.body.password);

    res.cookie("token", user.token,{
        sameSite:'none',
    });
    res.status(200).json({
        error: false,
        user: user.user,
    });
});
