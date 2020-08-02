arg=''
if test -d "public/${1}"
then
  arg="${1}/"
else
  echo $0: argument must be a directory
  exit 1
fi

if test -f "public/${arg}css/style.scss"
then
  gnome-terminal --tab -e "sass --watch --sourcemap=none public/${arg}css/style.scss:public/${arg}css/main.css" 1> /dev/null &
fi

if test $1
then
  gulp --$1
else
  gulp
fi
