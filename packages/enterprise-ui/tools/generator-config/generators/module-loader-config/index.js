const path = require('path');
const BaseGenerator = require('../BaseGenerator');

/**
 * @generator
 */
class ModuleLoaderConfigGenerator extends BaseGenerator {
  constructor(args, opts) {
    super(args, opts);

    const {
        options: {
            moduleLoaderConfigSrc,
            workspaces,
        }
    } = opts;

    this.workspaces = workspaces[0];
    this.moduleLoaderConfigSrc = moduleLoaderConfigSrc;
  }

  default() {
    this.log(this.moduleLoaderConfigSrc);
    this.log(this.workspaces);

    this.createFile(
        '_config.js.tpl',
        path.join(this.moduleLoaderConfigSrc, 'config.js'),
        {
            workspaces: this.workspaces,
        }
    );
  }
}

module.exports = ModuleLoaderConfigGenerator;
