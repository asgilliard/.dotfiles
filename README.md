### Storing your dotfiles using a non-bare, default repository:

```bash
git init $HOME/.dotfiles

echo "alias config='$(which git) --git-dir=$HOME/.dotfiles/.git/ --work-tree=$HOME'" >> $HOME/.zshrc  # or by hands

config config --local status.showUntrackedFiles no  # for clear status output

config add .vimrc 
config commit -m "add .vimrc"  # or any other config

# set up a remote repository on GitHub or your Git server of choice

config push origin main
```

### Installing on a new machine:

```bash
echo ".dotfiles" >> .gitignore  # for errors excluding

git clone <remote-git-repo-url> $HOME/.dotfiles

alias config='$(which git) --git-dir=$HOME/.dotfiles/.git --work-tree=$HOME'

config config --local status.showUntrackedFiles no

config checkout -f
```

### Commiting changes:

```bash
config status  # for checking unstaged changes

config add .vimrc
config commit -m 'changed .vimrc'  # or any other from status output

config push origin main
```
