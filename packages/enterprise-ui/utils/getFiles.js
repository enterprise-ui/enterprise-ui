var fs = require('fs');

module.exports = async function getFiles(filePaths = []) {
  const promises = filePaths.map((filePath) => {
    return new Promise(function (resolve, reject) {
      fs.readFile(require.resolve(filePath), 'utf8', function (err, contents) {
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
