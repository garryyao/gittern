#!/bin/bash

# Echoing text messages with colour.

declare -a colour
colour=(\
["Black"]="\033[0;30m" \
["Green"]="\033[0;32m" \
["Red"]="\033[0;31m" \
["Yellow"]="\033[0;33m" \
["Blue"]="\033[0;34m" \
["Purple"]="\033[0;35m" \
["Cyan"]="\033[0;36m" \
["White"]="\033[0;37m" \
#  Reset text attributes to normal
#+ without clearing screen
["RESET"]="\033[0m" \
)

function cecho ()                     # Color-echo.
                             # Argument $1 = message
                             # Argument $2 = color
{
local default_msg="No message passed."
                             # Doesn't really need to be a local variable.

echo -e $2
message=${1:-$default_msg}   # Defaults to default message.
color=${2:-${colour["Black"]}}           # Defaults to black, if not specified.

  echo -e "$color"
  echo "$message"
  echo -e "${colour["RESET"]}"                      # Reset to normal.
}

function log ()
{
  cecho $1 "${colour["Black"]}"
}

function warn ()
{
  cecho $1 "${colour["Yellow"]}"
}

function info ()
{
  cecho $1 "${colour["Cyan"]}"
}

function error ()
{
  cecho $1 "${colour["Red"]}"
}

export -f log warn info error

log "foo"
warn "bar"
info "baz"
error "quz"