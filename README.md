# Website - Christian Zommerfelds
My personal website: [christian.zommerfelds.com](http://christian.zommerfelds.com)

```
nvm use 8
```

Use `npm run` to check available commands.

## Dev notes

Test Lambda function:
```
`npm bin`/sls invoke local -f contact -p backend/test-input.json
```

## Pulumi:

Current progress:
Currently creating two separate projects, back-end and front-end. Need to split package.json into each project.

## Old notes

Don't do this unless you are not using Node 8: On Arch Linux (or probably any Node version >= 10) you need to:
```
env CXXFLAGS="-Wno-ignored-qualifiers -Wno-stringop-truncation -Wno-cast-function-type" npm install grpc
```
