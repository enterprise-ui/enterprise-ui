const fs = require('fs');
const path = require('path');

module.exports = function createFile(appPath, dirPath, filename, contents) {
  const dir = path.join(appPath, dirPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.writeFileSync(path.join(dir, filename), contents.join('\r\n'));
};
