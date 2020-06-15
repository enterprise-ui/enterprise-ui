# enterprise-ui
Enterprise-UI

Application builds with target 'node' and externals. App core library builds from sources.

Application requirements:
1. Set webpack target 'node'
2. Set libraryTarget to 'var'
3. Build all packages from sources (not implemented)
4. Set externals (react, react-router-dom and etc)
5. Need manual concats global variables to bundle.js

Global variables:
var React = require('react/umd/react.production.min');
var ReactRouterDOM = require('react-router-dom/umd/react-router-dom.min');
var ReactRedux = require('react-redux/dist/react-redux.min');
var ReactRouterConfig = require('react-router-config/umd/react-router-config.min');
var Redux = require('redux/dist/redux.min');
var ReduxSaga = require('redux-saga/dist/redux-saga.umd');
var ReduxThunk = require('redux-thunk/dist/redux-thunk.min');

```
$ yarn global add lerna
$ yarn install
$ yarn build:ssr
$ cd packages/app
$ yarn app:startssr
```
