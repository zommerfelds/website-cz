# Website - Christian Zommerfelds

This repository contains the source code for my personal website: [christian.zommerfelds.com](http://christian.zommerfelds.com)

## Running on Gitpod

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/zommerfelds/website-cz)

```
# This should be run automatically:
npm install
npm run serve
gp preview $(gp url 8080)
```

## Running on CodeSandbox

To modify code right on the browser, [click here](https://codesandbox.io/s/github/zommerfelds/website-cz) to open this project in CodeSandbox.

## Deployment

Every push to `master` will automatically deploy to AWS. This works using [GitHub Actions](.github/main.workflow).

## Dev notes

```
nvm use 8
```

Test Lambda function:

```
`npm bin`/sls invoke local -f contact -p backend/test-input.json
```
