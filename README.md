# Pinpoint Application

Welcome to your Pinpoint application.

## Deploy to Pinpoint

Deploy the app to [Pinpoint](https://pinpoint.com?utm_source=github&utm_medium=readme&utm_campaign=app-template) using the following command:

```bash
npm run deploy
# or
yarn deploy
```

## Preview Live on Stackblitz

Preview the app live on [StackBlitz](http://stackblitz.com/):

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/pinpt/app-template)

## Deploy to Vercel

Deploy the app using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=app-template):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/pinpt/app-template&project-name=pinpoint&repository-name=pinpoint)

## Deploy to Netlify

Deploy the app using [Netlify](https://netlify.com?utm_source=github&utm_medium=readme&utm_campaign=app-template):

[![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/pinpt/app-template)

## How to use

Execute [`create-pinpoint-app`](https://github.com/pinpt/create-pinpoint-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-pinpoint-app
# or
yarn create pinpoint-app
```

## Automatic Deployment with GitHub Actions

If you navigate to the dashboard and go to Settings and API Keys, generate a new API Key (must not be readonly). Copy the key value and create a GitHub Secret named `PINPOINT_API_KEY` with the value. Now, each time you merge your code to master, it will automatically deploy your site changes.
