# JS Automation
## Summary 
JS browser based automation using Playwright

## Development Environment
NodeJS: 26.11.0
Yarn: 4.18.1
Packages Used:
1. [Corepack](https://www.npmjs.com/package/corepack)
2. [Playwright](https://playwright.dev/)
3. [DotEnv](https://github.com/motdotla/dotenv)
4. [EsLint](https://eslint.org/)

## Setup
1. Install corepack `npm install -g corepack`
2. Enable corepack `corepack enable`
3. Install packages using yarn `yarn install`

## Running Tests
[Playwright running Tests](https://playwright.dev/docs/running-tests)
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
`yarn playwright test specs/login.spec.js`

## Encryption
Using NPM built in [Crypto](https://nodejs.org/api/crypto.html) package

### Note on Auth
Playwright has an [auth handling code](https://playwright.dev/docs/auth) which stores auth data from the browser context. 
The site being used in this demo code is a toy site that doesnt have serious auth handling.

## Linting
Setup Eslint and added plugin to VSC to lint on save.

### Run Eslint
`yarn eslint .`

## Docker Setup
Install [Docker Desktop](https://docs.docker.com/desktop/)

### Build Docker Image
Run the following command to build a docker image:  
```bash
docker build -t playwright_js:latest .
```

This creates an image named `playwright_js` with the image tag being `latest`
### Run Tests In Docker
After building the docker image run the following command to run the tests:

Run All Tests in Chromium:  
```bash
docker run --rm -e CREDENTIAL_KEY=#{key} -v `pwd`/test_results:/playwright_js/test_results playwright_js:latest yarn exec playwright test login.spec.js --project=chromium
```

Results sotred in the `test-results` folder

