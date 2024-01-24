import { Request, Response } from 'express'
import { controller, get, use } from './decorators'
import { requireAuth } from '../utils'
import { ROUTES, TEMPLATES } from '../types'

/**
    Decorator factories and decorators are functions which run when JS interpreter parses class definition, not when they are instantiated or their static properties are used.
*/

/**
 * Class defining root `index` and `protected` routes and route handlers.
 */
@controller(ROUTES.noRoutePrefix)
class RootController 
{
    /**
     * Sets up `get` HTTP request route handler.
     * @template Request Express's object type. Describes request object data structure.
     * @template Response Express's object type. Describes response object data structure.
     * @param {Request} req HTTP request data.
     * @param {Response} res HTTP response data.
     * @returns {void} No return value.
     */
    @get(ROUTES.index)
    getRoot(req: Request, res: Response): void
    {
        if (req.session?.loggedIn)
        {
            res.status(200).send(TEMPLATES.userLoggedInStartPage)
        }
        else
        {
            res.status(401).send(TEMPLATES.userNotLoggedInStartPage)
        }
    }

    /**
     * Sets up `get` HTTP request route handler.
     * @template Request Express's object type. Describes request object data structure.
     * @template Response Express's object type. Describes response object data structure.
     * @param {Request} req HTTP request data.
     * @param {Response} res HTTP response data.
     * @returns {void} No return value.
     */
    @get(ROUTES.protected)
    @use(requireAuth)
    getProtected(req: Request, res: Response): void
    {
        res.status(200).send(TEMPLATES.protectedAuthorized)
    }
}