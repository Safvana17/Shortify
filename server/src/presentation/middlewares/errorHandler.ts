import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { AppError } from "../../domain/errors/app.error";
import { ZodError } from "zod";
import { statusCode } from "../../shared/constants/statusCode";
import { authMessage } from "../../shared/constants/messages/authMessages";

export const errorHandler: ErrorRequestHandler = (
    error: unknown,
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    console.log('from error handler', error)

    if(error instanceof AppError){
        console.log('AppError: ', error.message)
        res.status(error.statusCode).json({
            success: false,
            message: error.message,
        })
        return
    }else if(error instanceof ZodError) {
        const errorMessage = error.issues.map((err) => err.message)[0]
        res.status(statusCode.BAD_REQUEST).json({
            success: false,
            message: errorMessage
        })
    }else{
        res.status(statusCode.SERVER_ERROR).json({
            success: false,
            message: error instanceof Error ? error.message : authMessage.error.INTERNAL_SERVER_ERROR
        })
    }
}