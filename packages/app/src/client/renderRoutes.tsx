import React from 'react';

import { Route, Switch } from 'react-router-dom';

export function renderRoutes(routes: any, extraProps?: any, switchProps?: any) {
  if (extraProps === void 0) {
    extraProps = {};
  }

  if (switchProps === void 0) {
    switchProps = {};
  }

  return routes
    ? React.createElement(
        Switch,
        switchProps,
        routes.map(function (route: any, i: number) {
          return React.createElement(Route, {
            key: route.key || i,
            path: route.path,
            exact: route.exact,
            strict: route.strict,
            render: function render(props) {
              return route.render
                ? route.render(props)
                : React.createElement(route.component, props);
            },
          });
        }),
      )
    : null;
}
