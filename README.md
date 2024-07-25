# Website - Christian Zommerfelds

This repository contains the source code for my personal website: [christian.zommerfelds.com](http://christian.zommerfelds.com)

## Running on Gitpod (recommended)

To modify and run code right in the browser: [![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/zommerfelds/website-cz)

## Deployment

Every push to `master` will automatically deploy to AWS. This works using [GitHub Actions](.github/main.workflow).

## Dev notes

Private notes: [Google Doc](https://docs.google.com/document/d/1WJ87UocBy3VOwLWRSMfH6BrdA_wtsploBNz2FiJqehA/edit)

```
nvm use 20
```

Test Lambda function:

```
RECAPTCHA_SECRET=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe CONTACT_EMAIL=put@email.here npx sls invoke local -f contact -p backend/test-input.json
```

Deploy:
```
gp idp login aws --role-arn arn:aws:iam::168146358807:role/local-dev-admin-access
RECAPTCHA_SECRET=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe CONTACT_EMAIL=put@email.here bash deploy-backend.sh
RECAPTCHA_SECRET=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe CONTACT_EMAIL=put@email.here npx sls invoke -f contact -p backend/test-input.json

(export RECAPTCHA_SECRET=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe CONTACT_EMAIL=put@email.here; bash deploy-backend.sh && npx sls invoke -f contact -p backend/test-input.json)
```
