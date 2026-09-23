# zcomet plugin manager
source ~/.zcomet/bin/zcomet.zsh

# plugins
zcomet load zsh-users/zsh-autosuggestions
zcomet load zsh-users/zsh-syntax-highlighting  

# Paths
export GOROOT="/usr/local/go"
export GOPATH="$HOME/go"
export PATH="\
$GOROOT/bin:\
$GOPATH/bin:\
/opt/local/libexec/qt6/bin:\
$HOME/platform-tools:\
$HOME/.cargo/bin:\
$HOME/.local/bin:\
/opt/local/bin:\
/opt/local/sbin:\
/opt/local/libexec/gnubin:\
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

# Fast init via eval cache / async
eval "$(starship init zsh)"
eval "$(zoxide init zsh)"

# zcomet compinit
zcomet compinit

# Lazy load for NVM (подгружается только при первом вызове nvm/node/npm)
export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  nvm() {
    unset -f nvm node npm npx
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
    nvm "$@"
  }
  node() { nvm; node "$@"; }
  npm()  { nvm; npm "$@"; }
  npx()  { nvm; npx "$@"; }
fi

fix1251() {
  local dir="${1:-.}"
  find "$dir" -type f -name "*.txt" -exec sh -c '
    for f; do
      iconv -f cp1251 -t utf-8 "$f" > "$f.tmp" && mv "$f.tmp" "$f"
    done
  ' sh {} +
  echo "Done"
}