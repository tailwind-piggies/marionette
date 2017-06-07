export MACHINE="121.196.206.228"
export DIR="/data/staging/static/marionette/"

rsync -arv public root@$MACHINE:$DIR
