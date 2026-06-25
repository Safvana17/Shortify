import z, { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";


type RequestProperty = 'body' | 'params' | 'query'

export const validate = <T extends ZodSchema>(schema: T, property: RequestProperty) => (
    req: Request,
    res: Response,
    next: NextFunction
): asserts req is Request & {
    [K in typeof property]: z.infer<T>
} => {
    const parsed = schema.parse(req[property])
    if(property === 'query') {
        req.validatedQuery = parsed
    }else if(property === 'params') {
        req.validatedParams = parsed
    } else {
        req[property] = parsed
    }
    next()
}