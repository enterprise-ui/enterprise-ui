const path = require('path');
const BaseGenerator = require('../BaseGenerator');

/**
 * @generator
 */
class ModuleLoaderConfigGenerator extends BaseGenerator {
  constructor(args, opts) {
    super(args, opts);

    const {
      options: { mode, moduleLoaderConfigSrc, workspaces },
    } = opts;

    this.mode = mode;
    this.workspaces = workspaces[0];
    this.moduleLoaderConfigSrc = moduleLoaderConfigSrc;
  }

  default() {
    this.createFile('_config.js.tpl', path.join(this.moduleLoaderConfigSrc, 'config.js'), {
      isLoadStatic: this.mode === 'production', workspaces: this.workspaces,
    });
  }
}

module.exports = ModuleLoaderConfigGenerator;
