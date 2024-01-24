/*
    Reasons for using readonly objects over Enums are of the same nature as the TS Documentation suggests:
      1. Better performance
      2. Easier integration when/if the Enums become available inside the JavaScript language itself
*/

/**
 * Server route paths.
 */
const ROUTES = {
    noRoutePrefix: '',
    index: '/',
    auth: '/auth',
    login: '/login',
    logout: '/logout',
    protected: '/protected'
} as const

/**
 * Warning/error messages used for server responses.
 */
const ERROR_MESSAGES = {
    wrongEmailOrPassword: 'Wrong email or password!',
    notAuthorized: 'You are not authorized to access this page!',
    invalidRequest: 'Invalid request!'
} as const

/**
 * HTML templates used for server responses.
 */
const TEMPLATES = {
    userLogInFormTemplate: `
        <form method="POST">
            <input type="email" name="email" placeholder="Username">
            <input type="password" name="password" placeholder="Password">
            <button type="submit">Submit</button>
        </form>
    `,
    wrongEmailOrPassword: `
        <div>
            <p>${ERROR_MESSAGES.wrongEmailOrPassword}</p>
        </div>
    `,
    userLoggedInStartPage: `
        <div>
            <h1>Welcome User</h1>
            <a href="${ROUTES.auth}${ROUTES.logout}">Log out</a>
        </div>
    `,
    userNotLoggedInStartPage: `
        <div>
            <h1>You are not logged in</h1>
            <a href="${ROUTES.auth}${ROUTES.login}">Log in</a>
        </div>
    `,
    protectedAuthorized: `
        <div>
            <p>Welcome User. Enjoy!</p>
            <a href="${ROUTES.auth}${ROUTES.logout}">Log out</a>
        </div>
    `,
    protectedNotAuthorized: `
        <div>
            <p>${ERROR_MESSAGES.notAuthorized}</p>
            <a href="${ROUTES.auth}${ROUTES.login}">Log in</a>
        </div>
    `
} as const

/**
 * Properties whose existence assertion on body is neccessary.
 */
const REQUEST_BODY_PROPERTIES = {
    email: 'email',
    password: 'password'
} as const

/**
 * Fixtures used across the application for quick tests.
 */
const FIXTURES = {
    mockEmail: 'example@example.com',
    mockPassword: 'password'
} as const

/**
 * Keys under which metadata value is stored.
 */
const METADATA_KEYS = {
    method: 'method',
    path: 'path',
    middlewares: 'middlewares',
    bodyValidators: 'bodyValidators'
} as const

/**
 * HTTP methods which are assigned to the application router/s.
 */
const HTTP_METHODS = {
    post: 'post',
    get: 'get',
    patch: 'patch',
    put: 'put',
    delete: 'delete'
} as const

/**
 * Cookie session encryption key.
 */
const COOKIE_SESSION_KEY_ONE = '@RandomSecret22!'

export { ROUTES, ERROR_MESSAGES, TEMPLATES, REQUEST_BODY_PROPERTIES, FIXTURES, METADATA_KEYS, HTTP_METHODS, COOKIE_SESSION_KEY_ONE }