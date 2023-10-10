./node_modules/typescript/bin/tsc
mkdir -p dist
rm dist/index.html
rm dist/styles.css
rm -r dist/images
cp ts/CSReport/CSReportEditor/index.html dist/
cp ts/CSReport/CSReportEditor/styles.css dist/
cp -r ts/CSReport/CSReportEditor/controls/images/ dist/images/
