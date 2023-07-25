import { NextFunction, Request, Response } from "express";

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({
        success: false,
        message: err.message,
    });
};
