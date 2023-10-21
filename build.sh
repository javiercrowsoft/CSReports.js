set -e
echo "creating dist"
mkdir -p dist
dele_if_exists() {
    file=$1
    if [ -f "$file" ] ; then
        rm "$file"
    fi
}
dele_folder_if_exists() {
    folder=$1
    if [ -f "$folder" ] ; then
        rm f "$folder"
    fi
}
echo "removing js files"
dele_if_exists dist/csreports.js
dele_if_exists dist/csreports.js.map
echo "compile ts files"
./node_modules/typescript/bin/tsc
echo "removing static files"
dele_if_exists dist/index.html
dele_if_exists dist/styles.css
dele_folder_if_exists -r dist/images
echo "copying static files"
cp ts/CSReport/CSReportEditor/index.html dist/
cp ts/CSReport/CSReportEditor/styles.css dist/
cp -r ts/CSForms/controls/images/ dist/images/
echo "build complete !!!"