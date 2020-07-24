const paths = require('./paths');
const getFiles = require('../utils/getFiles');

const { platforms, vendors } = require(paths.appConfig);

module.exports = async function getBundles() {
  const vendorsPromise = getFiles(vendors);
  const platformsPromise = getFiles(platforms);
  const vendorList = await vendorsPromise;
  const platformList = await platformsPromise;

  return {platformList, vendorList};
};
