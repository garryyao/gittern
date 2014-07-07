# Instrumental Git with Gittern
Gittern is bundle of Git extensions scripts written in [shelljs](https://github.com/arturadib/shelljs),
featuring to reduce daily routines verbosity when working with Git.

## Install from NPM

```bash
sudo npm install -g gittern
```

# Compatibility Test
 * OSX 10.6 - tested
 * Msysgit - tested

## List of available commands

### git br

Print the current working branch name.

### git tr [branch]

Print the remote tracking branch of the current/specified branch.

### git repo

Figure out the Git repository name of the current working copy.

### git sync [branch]

Receive fast-forward changes from the remote tracking branch by rebasing local changes onto it.

### git align

Discard any local changes made to align with the HEAD of remote tracking branch.

### git close [branch]

Remove both the local and the remote tracking branch.

### git each [pattern] [command]

Execute the command, in each of git repo (sub) directory that are matched by the specified pattern.

### git submodule-setup

Automatically add all sub modules from your .gitmodules file in the working directory.

### git url [ref]

Generate an URL of the Git web interface that points to the specified git ref/tag/branch.




