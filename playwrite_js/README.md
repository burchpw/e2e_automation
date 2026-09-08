# JS Automation
## Summary 
JS browser based automation using Playwrite

## Development Environment
NodeJS: 26.2.0
Yarn: 1.22.22
Packages Used:
1. [Corepack](https://www.npmjs.com/package/corepack)
2. [Playwrite](https://playwright.dev/)
3. [DotEnv](https://github.com/motdotla/dotenv)
4. [EsLint](https://eslint.org/)

## Setup
1. Install corepack `npm install -g corepack`
2. Enable corepack `corepack enable`
3. Install packages using yarn `yarn install`

## Running Tests
[Playwrite running Tests](https://playwright.dev/docs/running-tests)
### Run headless for all browsers:
`yarn playwright test`

### Run non headless for all browsers:
`yarn playwright test --headed`

### Run for only 1 browser:
`yarn playwright test --project=chromium`

Browser options:
1. chromium
2. firefox
3. webkit 

### Run for specific test file:
`yarn playwright test specs/example.login.spec.js`

## Encryption
Using NPM built in [Crypto](https://nodejs.org/api/crypto.html) package

### Note on Auth
Playwrite has an [auth handling code](https://playwright.dev/docs/auth) which stores auth data from the browser context. 
The site being used in this demo code is a toy site that doesnt have serious auth handling.
