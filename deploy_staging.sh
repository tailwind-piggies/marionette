export MACHINE="121.196.206.228"
export DIR="/data/static/coupons/"

rsync -arv public/ root@$MACHINE:$DIR
