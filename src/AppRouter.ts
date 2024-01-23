import { Router } from 'express'

/**
 * Class defining router singleton. This approach is taken in order to make the testing easier.
 */
class AppRouter
{
    private static instance: Router

    /**
     * Accessor tasked with creating a router instance, if there was none, and returning it.
     * @returns {Router} Returns a router instance.
     */
    static get getInstance(): Router
    {
        if (!AppRouter.instance)
        {
            AppRouter.instance = Router()
        }

        return AppRouter.instance
    }
}

export { AppRouter }