import 'reflect-metadata'
import { RequestHandler } from 'express'
import { AppRouter } from '../../AppRouter'
import { bodyValidatorHandler } from '../../utils'
import { METADATA_KEYS, HTTPMethodValue } from '../../types'

const ROUTER = AppRouter.getInstance

/**
 * Decorator factory which collects metadata - HTTP method, server route path, middlewares (if any) and request body validator (if any) - registered for every Class method and sets up router. 
 * 
 * Argument provided will be used as a route's path prefix for each route set up on router.
 * @param {string} routePrefix A route's path prefix for each route set up on router.
 * @returns {Function} Returns class decorator.
 */
const controller = (routePrefix: string): Function =>
    /**
     * Class decorator which collects metadata - HTTP method, server route path, middlewares (if any) and request body validator (if any) - registered for every Class method and sets up router.
     * @param {Function} target Class constructor function.
     * @returns {void} No return value.
     */
    (target: Function): void =>
        void Object.getOwnPropertyNames(target.prototype).forEach((key: string): void =>
        {
            const METHOD: HTTPMethodValue = Reflect.getMetadata(
                METADATA_KEYS.method, 
                target.prototype, 
                key
            )
            const PATH: string = Reflect.getMetadata(
                METADATA_KEYS.path, 
                target.prototype, 
                key
            )
            const MIDDLEWARES: RequestHandler[] = Reflect.getMetadata(
                METADATA_KEYS.middlewares, 
                target.prototype, 
                key
            ) || []
            const BODY_VALIDATORS: string[] = Reflect.getMetadata(
                METADATA_KEYS.bodyValidators,
                target.prototype,
                key
            ) || []
            const bodyValidatorMiddleware = bodyValidatorHandler(BODY_VALIDATORS)

            if (METHOD && PATH)
            {
                ROUTER[METHOD](
                    `${routePrefix}${PATH}`, 
                    ...MIDDLEWARES, 
                    bodyValidatorMiddleware,
                    target.prototype[key]
                )
            }
        })

export { controller }