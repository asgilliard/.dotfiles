# zcomet plugin manager
source ~/.zcomet/bin/zcomet.zsh

# plugins
zcomet load zsh-users/zsh-autosuggestions
zcomet load zsh-users/zsh-syntax-highlighting  

# starship prompt
eval "$(starship init zsh)"

# Paths
export PATH="\
/opt/local/libexec/qt5/bin:\
/opt/local/libexec/llvm-19/bin:\
$HOME/.cargo/bin:\
$HOME/.local/bin:\
/opt/local/bin:\
/opt/local/sbin:\
/opt/local/libexec/gnubin:\
/opt/local/lib/postgresql17/bin:\
/usr/local/bin:\
/usr/local/sbin:\
/usr/bin:\
/bin:\
/usr/sbin:\
/sbin:\
/opt/X12/bin"

# Locales
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

# Aliases
alias la='ls -lA'
alias ls="eza --tree --level=1 --icons=always"

alias cd='z'
alias helix='hx'

alias config='$(which git) --git-dir=$HOME/.dotfiles.git/ --work-tree=$HOME'

# History setup
HISTFILE=$HOME/.zhistory
SAVEHIST=1000
HISTSIZE=999
setopt share_history
setopt hist_expire_dups_first
setopt hist_ignore_dups
setopt hist_verify

# Completion using arrow keys (based on history)
bindkey '^[[A' history-search-backward
bindkey '^[[B' history-search-forward

# zoxide
eval "$(zoxide init zsh)"

# complete initialisation
zcomet compinit
