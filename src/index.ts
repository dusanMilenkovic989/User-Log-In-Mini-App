import express from 'express'
import cookieSession from 'cookie-session'
import './controllers/RootController'
import './controllers/LoginController'
import { AppRouter } from './AppRouter'
import { COOKIE_SESSION_KEY_ONE } from './types'

/*
    This application's purpose is to present, on a mini-scale, how TypeScript could be integrated with a third party library, in this case - Express.js, in an advanced manner, manually, without the @types decorators installation.

    ****** TYPESCRIPT INTEGRATION INTO EXPRESS.JS IDEA ******
      1. Start with low level TS integration inside the Express.js library; refactor it into using decorators and metadata to enhance developer experience and get slightly better type safety
      2. Set up decorators using the _Controller class
      3. Associate route configuration info with the _Controller class methods by using decorators and metadata
      4. All method decorators execute on class definition interpretation, bottom to top, with the class decorator running last
      5. Class decorator reads metadata for each method and adds complete route definitions to the router

    This app is using barrel modules.
    Be aware that barrel modules could cause unwanted effects:
      - Some testing frameworks (Jest) might take longer time to run tests when parsing barrel modules. Barrel modules intentionally obfuscate file location and testing frameworks could have to load every export inside it to find its target
      - Barrel modules could be affecting JS file size significantly in larger-scale projects, which could affect website's user experience
      - Continuous integration stages times could be affected by a large percent
      - Bundlers might encounter issues when TypeScript is combined with barrel modules

    JSDoc has been used throughout the application only to describe different Classes, functions and types.
    Its functionality of type checking is disabled inside the TS compiler configuration file.
    When enabling type checking of JSDoc, make sure that the types are correctly described.
*/

const PORT = process.env.PORT || 3000
const APP = express()

APP.use(express.urlencoded({ extended: true }))
APP.use(express.json())
APP.use(cookieSession({ keys: [COOKIE_SESSION_KEY_ONE] }))
APP.use(AppRouter.getInstance)

APP.listen(PORT, (): void =>
{
    console.log(`Listening at port: ${PORT}`)
})