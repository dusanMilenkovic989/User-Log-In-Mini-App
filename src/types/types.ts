import { RequestHandler } from 'express'
import { HTTP_METHODS } from './'

/**
 * Describes property descriptor type with customized *value* property to represent the Express RequestHandler type and, hence, prevent method decorators to be used on methods other than the Express request (route) handler.
 */
interface HandlerPropertyDescriptor extends PropertyDescriptor
{
    value?: RequestHandler
}

/**
 * Describes possible HTTP method values.
 */
type HTTPMethodValue = keyof typeof HTTP_METHODS


export { HandlerPropertyDescriptor, HTTPMethodValue }