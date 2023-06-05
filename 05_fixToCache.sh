#!/bin/bash

source 00_cfg.sh

# remove toCache section
cat $SD/worker.js | \
    sed -e '/const toCache = \[/,/\]; \/\/ toCache/d' -e $'/const CACHE_NAME/a\\\nconst toCache = \[\];' | \
    cat > $TMPD/worker.js

mv -f $TMPD/worker.js $SD/worker.js

# make new toCache section
printf "const toCache = [\n" > "$TFN"
find "$SD" -type f | \
    grep -v "worker.js$" | \
    grep -v ".php$" | \
    grep -v "$SD/json/" | \
    grep -v "$SD/purecss/HISTORY.md" | \
    grep -v "$SD/purecss/LICENSE" | \
    grep -v "$SD/purecss/README.md" | \
    grep -v "app.webmanifest$" | \
    cut -c${PFX_LEN}- | \
    sort | \
while read FN; do
    printf "$SPC\"$FN\",\n"
done >> "$TFN"

printf "$SPC\".\"\n" >> "$TFN"
printf "]; // toCache\n" >> "$TFN"

$GNU_SED -i -e '/const toCache.*/r '$TFN -e '/const toCache = \[\];/d' "$SD/worker.js"
