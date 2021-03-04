const path = require('path');
const fs = require('fs');

const projectDir = path.join(__dirname, '../..');
if (!projectDir) {
  return
}

const apxchartsPkg = path.join(projectDir, 'node_modules/apexcharts');;
if (!apxchartsPkg) {
  return
}
const apxchartsPkgJson = JSON.parse(fs.readFileSync(apxchartsPkg + '/package.json', 'utf8'));
if (!apxchartsPkgJson) {
  return
}
apxchartsPkgJson['module'] = "dist/apexcharts.esm.js";
fs.writeFileSync(apxchartsPkg + '/package.json', JSON.stringify(apxchartsPkgJson, null, 2))
