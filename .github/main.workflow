workflow "Deployment" {
  on = "push"
  resolves = [
    "Deploy to AWS"
  ]
}

action "Only master branch" {
  uses = "actions/bin/filter@3c0b4f0e63ea54ea5df2914b4fabf383368cd0da"
  args = "branch master"
}

action "Deploy to AWS" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "npm run deploy"
  secrets = ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY", "RECAPTCHA_SECRET", "CONTACT_EMAIL"]
  needs = ["Only master branch"]
}
