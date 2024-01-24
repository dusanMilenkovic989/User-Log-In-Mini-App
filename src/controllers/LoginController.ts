import { Request, Response } from 'express'
import { controller, post, get, bodyValidator } from './decorators'
import { ROUTES, TEMPLATES, REQUEST_BODY_PROPERTIES, FIXTURES } from '../types'

/**
    Decorator factories and decorators are functions which run when JS interpreter parses class definition, not when they are instantiated or their static properties are used.
*/

/**
 * Class defining `login` and `logout` routes and route handlers.
 */
@controller(ROUTES.auth)
class LoginController
{
    /**
     * Sets up `get` HTTP request route handler.
     * @template Request Express's object type. Describes request object data structure.
     * @template Response Express's object type. Describes response object data structure.
     * @param {Request} req HTTP request data.
     * @param {Response} res HTTP response data.
     * @returns {void} No return value.
     */
    @get(ROUTES.login)
    getLogin(req: Request, res: Response): void
    {
        res.status(200).send(TEMPLATES.userLogInFormTemplate)
    }

    /**
     * Sets up `post` HTTP request route handler.
     * @template Request Express's object type. Describes request object data structure.
     * @template Response Express's object type. Describes response object data structure.
     * @param {Request} req HTTP request data.
     * @param {Response} res HTTP response data.
     * @returns {void} No return value.
     */
    @post(ROUTES.login)
    @bodyValidator(REQUEST_BODY_PROPERTIES.email, REQUEST_BODY_PROPERTIES.password)
    postLogin(req: Request, res: Response): void
    {
        const { email: EMAIL, password: PASSWORD } = req.body
        
        if (EMAIL === FIXTURES.mockEmail && PASSWORD === FIXTURES.mockPassword)
        {
            req.session = { loggedIn: true }
            res.status(200).redirect('/')
        }
        else
        {
            res.send(TEMPLATES.wrongEmailOrPassword)
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
    @get(ROUTES.logout)
    getLogout(req: Request, res: Response): void
    {
        req.session = undefined
        res.status(200).redirect(ROUTES.index)
    }
}
