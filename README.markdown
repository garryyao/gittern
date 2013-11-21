# Instrumental Git with Gittern
Gittern is simply a bunch of BASH scripts as Git extensions/sub commands, featuring to reduce daily routines verbosity.

## Install (Please run with git bash shell)

```bash
git clone git@github.com:garryyao/gittern.git
cd gittern && ./install.sh
```

## List of available commands

### git br

Print the current working branch name.

### git tr [branch]

Print the remote tracking branch of the current/specified branch.

### git repo-name

Figure out the Git repository name of the current working copy.

### git sync [branch]

Receive fast-forward changes from the remote tracking branch by rebasing local changes onto it.

### git align

Discard any local changes made to align with the HEAD of remote tracking branch.

### git close [branch]

Remove both the local and the remote tracking branch.

### git each [regexp] [command]

Execute the specified command, in each of git repo (sub) directory that are matched by the pattern.

### git submodule-setup

Automatically add all sub modules from your .gitmodules file in the working directory.

### git url [ref]

Generate an URL of the Git web interface that points to the specified REF.




