export MACHINE="121.196.206.228"
export DIR="/data/static/coupons/"

rsync -arv ./ --exclude-from=./.gitignore --exclude=.git root@$MACHINE:$DIR
