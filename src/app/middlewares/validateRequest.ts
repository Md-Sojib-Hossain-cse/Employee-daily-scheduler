import { NextFunction, Request, Response } from "express";
import { ZodError, ZodObject } from "zod";

const validateRequest =  (schema  : ZodObject<any>) => {
    return async(req :Request , res : Response , next : NextFunction) => {
        try {
            // Validate the request body against the provided schema
            await schema.parseAsync(req.body);
            //if validation is successful, move to next middleware
            next()
        } catch (error) {
            //if validation fails, send error response
            return next(error)
        }
    }  
}

export default validateRequest;