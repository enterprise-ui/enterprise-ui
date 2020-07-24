var fs = require('fs');
const path = require('path');
const paths = require('../config/paths');

module.exports = async function getFiles(filePaths = []) {
  const promises = filePaths.map((filePath) => {
    return new Promise(function (resolve, reject) {
      fs.readFile(path.join(paths.rootNodeModules, filePath), 'utf8', function (err, contents) {
        if (err) {
          reject(err);
        } else {
          resolve(contents);
        }
      });
    });
  });

  return Promise.all(promises);
};
