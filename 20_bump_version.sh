#!/bin/bash

# set -x
set -e

if [ "x$(uname -s)" = "xDarwin" ]; then
    echo "MacOSX gnu-tools fix"
    GNU_SED=gsed
else
    GNU_SED=sed
fi
export GNU_SED

#######################################
: ${VER:=1.0.1}
#######################################
#DT=`TZ=Z date +"%g\/%m\/%d %H:%M:%S UTC"`
DT=`TZ=Europe/Prague date +"%Y\/%m\/%d %H:%M:%S %Z"`

for FN in web/worker.js web/js/script.js; do
    $GNU_SED -i 's/\(const cts\s*=\s*"\)[^"]*\(";\)/\1'"$DT"'\2/' "$FN"
    printf "const %10s FN:%20s RC:%d\n" "cts" "$FN" "$?"
    $GNU_SED -i 's/\(const version\s*=\s*"\)[^"]*\(";\)/\1'"$VER"'\2/;s/\(const version\s*=\s*"\)[^"]*\(";\)/\1'"$VER"'\2/' "$FN"
    printf "const %10s FN:%20s RC:%d\n" "version" "$FN" "$?"
done
#eof
