set -e
echo "copying csreports into cairo"
dele_if_exists() {
    file=$1
    if [ -f "$file" ] ; then
        rm "$file"
    fi
}
dele_folder_if_exists() {
    folder=$1
    if [ -d "$folder" ] ; then
        rm -Rf "$folder"
    fi
}
dele_folder_if_exists ../CrowSoft-Cairo/web/cairo/app/client/cairo/libs/csreports
cp -r dist/ ../CrowSoft-Cairo/web/cairo/app/client/cairo/libs/csreports
dele_if_exists ../CrowSoft-Cairo/web/cairo/app/client/cairo/libs/csreports/csreports.js.map

echo "done"