mkdir -p dist
rm dist/csreports.js
rm dist/csreports.js.map
./node_modules/typescript/bin/tsc
rm dist/index.html
rm dist/styles.css
rm -r dist/images
cp ts/CSReport/CSReportEditor/index.html dist/
cp ts/CSReport/CSReportEditor/styles.css dist/
cp -r ts/CSReport/CSReportEditor/controls/images/ dist/images/
