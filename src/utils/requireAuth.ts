import { Request, Response, NextFunction } from 'express'
import { TEMPLATES } from '../types'

/**
 * Middleware which asserts the user is logged in, by searching cookies session object on request for neccessary data.
 * @template Request Express's object type. Describes request object data structure.
 * @template Response Express's object type. Describes response object data structure.
 * @template NextFunction Express's function type. Describes function parameters, their types and type of the return value.
 * @param {Request} req HTTP request data.
 * @param {Response} res HTTP response data.
 * @param {NextFunction} next Next function - middleware or request (route) handler - to execute if all the conditions of the middleware are met.
 * @returns {void} No return value.
 */
const requireAuth = (req: Request, res: Response, next: NextFunction): void =>
{
    if (req.session?.loggedIn)
    {
        next()

        return
    }

    res.status(403).send(TEMPLATES.protectedNotAuthorized)
}

export { requireAuth }