# set -x
set -e

if [ "x$(uname -s)" = "xDarwin" ]; then
    echo "MacOSX gnu-tools fix"
    GNU_SED=gsed
else
    GNU_SED=sed
fi
export GNU_SED

SD=web
TMPD=tmp
TFN=$TMPD/files.txt
PFX_LEN=`echo -n "$SD//" | wc -c | tr -cd "0-9"`
SPC="    "
[ -d "$TMPD" ] || mkdir -p "$TMPD"
