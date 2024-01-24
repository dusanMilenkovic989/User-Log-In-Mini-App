import 'reflect-metadata'
import { METADATA_KEYS, HandlerPropertyDescriptor } from '../../types'

/**
 * Decorator factory which sanitizes and registers arguments provided as metadata for later usage inside the controller decorator.
 * @param {string[]} keys Property/ies whose existence should be validated on the *request* body.
 * @returns {Function} Returns method decorator.
 */
const bodyValidator = (...keys: string[]): Function =>
    /**
     * Method decorator which sanitizes and registers arguments provided to its decorator factory as metadata for later usage inside the controller decorator.
     * @template HandlerPropertyDescriptor Describes property descriptor type with customized *value* property to represent the Express RequestHandler type and, hence, prevent method decorators to be used on methods other than the Express request (route) handler.
     * @param {Object} target Class prototype.
     * @param {string | symbol} key Method of the class prototype.
     * @param {HandlerPropertyDescriptor} propDesc Property descriptor.
     * @returns {void} No return value.
     */
    (target: Object, key: string | symbol, propDesc: HandlerPropertyDescriptor): void =>
    {
        const FORMATTED_KEYS = keys.map((key: string): string => key.toLowerCase())
        Reflect.defineMetadata(METADATA_KEYS.bodyValidators, FORMATTED_KEYS, target, key)
    }

export { bodyValidator }