import { RequestHandler, Request, Response, NextFunction } from 'express'
import { ERROR_MESSAGES } from '../types'

/**
 * Utility higher order function which passes request body properties list, provided as argument, to bodyValidator middleware and returns it. Middleware will assert the existence of the request body and the properties on it.
 * @param {string[]} keys Request body properties list.
 * @returns {RequestHandler} Returns bodyValidator middleware.
 */
const bodyValidatorHandler = (keys: string[]): RequestHandler =>
    /**
     * Middleware which asserts the existence of the request body and certain properties on it.
     * @param {Request} req HTTP request data.
     * @param {Response} res HTTP response data.
     * @param {NextFunction} next Next function - middleware or request (route) handler - to execute if all the conditions of the middleware are met.
     * @returns {void} No return value.
     */
    (req: Request, res: Response, next: NextFunction): void =>
    {
        if (!req.body)
        {
            res.status(422).send(ERROR_MESSAGES.invalidRequest)
            console.warn(ERROR_MESSAGES.invalidRequest)

            return
        }
        
        for (const KEY of keys)
        {
            if (!req.body[KEY])
            {
                res.status(422).send(ERROR_MESSAGES.invalidRequest)
                console.warn(ERROR_MESSAGES.invalidRequest)

                return
            }
        }

        next()
    }

    export { bodyValidatorHandler }