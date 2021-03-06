process.env.NODE_ENV = 'production';

const compression = require('compression');
const express = require('express');
const path = require('path');
const paths = require('../config/paths');
const getWorkspaces = require('../config/getWorkspaces');

const { packages } = require(paths.appConfig);

const workspaces = getWorkspaces(paths.rootPackageJson, packages);
const routes = workspaces.map(({publicPath}) => path.join(publicPath, '*'));

const app = express();

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) return false;
  return compression.filter(req, res);
}

app.use(
  compression({
      level: 2,
      filter: shouldCompress,
  })
);

app.use(express.static(paths.appBuild, {index: false}));

app.get(['/', ...routes], function (req, res) {
  res.status(200).sendFile(path.join(paths.appBuild, '/index.html'));
});

app.use((err, req, res, next) => {
  if (req.xhr) {
    res.status(500).send({
      errorCode: 500,
      message: 'Internal Server Error',
    });
  } else {
    next(err);
  }
});

const server = app.listen(process.env.PORT || 3000, () => {
  const address = server.address();
  console.log('Express server listening on port %d with pid %d', address.port, process.pid);
});
