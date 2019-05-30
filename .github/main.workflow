workflow "Main" {
  on = "push"
  resolves = "Publish"
}

action "Install" {
  uses = "docker://culturehq/actions-yarn:latest"
  args = "install"
}

action "Lint" {
  needs = "Install"
  uses = "docker://culturehq/actions-yarn:latest"
  args = "lint"
}

action "Test" {
  needs = "Install"
  uses = "docker://culturehq/actions-yarn:latest"
  args = "test"
}

action "Tag" {
  needs = ["Lint", "Test"]
  uses = "actions/bin/filter@master"
  args = "tag"
}

action "Publish" {
  needs = "Tag"
  uses = "actions/npm@master"
  args = "publish --access public"
  secrets = ["NPM_AUTH_TOKEN"]
}
