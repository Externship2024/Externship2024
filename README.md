# Externship2024

Useful git commands

Clone repo:
git clone https://github.com/kevinchristianson/Externship2024.git
- then open repo: `cd Externship2024`

Create your own branch (and move to it):

`git checkout -b {your-branch-name}`
`ex: git checkout -b kevin/newbranch`

[make your changes]

`git commit [-a] [-m ""]`
- [-a]: commit all local changes
- [-m "{message"]: Add a commit message (instead of writing it in vim)
ex: `git commit -am "Made changes"`

`git push --set-upstream origin/kevin/newbranch`
- push changes to github repo
- --set-upstream flag only required on first push

