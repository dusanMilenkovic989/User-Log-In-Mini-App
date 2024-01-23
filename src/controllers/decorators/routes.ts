import 'reflect-metadata'
import { METADATA_KEYS, HTTP_METHODS, HandlerPropertyDescriptor } from '../../types'

/**
 * Higher order function tasked with passing its argument - HTTP method - to the decorator factory, which registers method passed and server route path provided as metadata for later usage inside the controller decorator.
 * @param {string} method HTTP method.
 * @returns {Function} Returns decorator factory.
 */
const routeBinder = (method: string): Function =>
    /**
     * Decorator factory which registers method passed from HOF and server route path provided as metadata for later usage inside the controller decorator.
     * @param {string} path Server route path.
     * @returns {Function} Method decorator.
     */
    (path: string): Function =>
        /**
         * Method decorator which registers method and server route path as metadata for later usage inside the controller decorator factory.
         * @param {Object} target Class prototype.
         * @param {string | symbol} key Method of the class prototype.
         * @param {HandlerPropertyDescriptor} propDesc Property descriptor with customized *value* property to represent the Express RequestHandler type and, hence, prevent this method decorator to be used on method other than the Express request (route) handler.
         * @returns {void} No return value.
         */
        (target: Object, key: string | symbol, propDesc: HandlerPropertyDescriptor): void => 
        {
            Reflect.defineMetadata(METADATA_KEYS.method, method, target, key)
            Reflect.defineMetadata(METADATA_KEYS.path, path, target, key)
        }

/**
 * Decorator factory which registers `post` HTTP method for the server route path provided. Controller decorator factory will add prefix to this route.
 */
const post = routeBinder(HTTP_METHODS.post)

/**
 * Decorator factory which registers `get` HTTP method for the server route path provided. Controller decorator factory will add prefix to this route.
 */
const get = routeBinder(HTTP_METHODS.get)

/**
 * Decorator factory which registers `patch` HTTP method for the server route path provided. Controller decorator factory will add prefix to this route.
 */
const patch = routeBinder(HTTP_METHODS.patch)

/**
 * Decorator factory which registers `put` HTTP method for the server route path provided. Controller decorator factory will add prefix to this route.
 */
const put = routeBinder(HTTP_METHODS.put)

/**
 * Decorator factory which registers `delete` HTTP method for the server route path provided. Controller decorator factory will add prefix to this route.
 */
const del = routeBinder(HTTP_METHODS.delete)

export { post, get, patch, put, del }