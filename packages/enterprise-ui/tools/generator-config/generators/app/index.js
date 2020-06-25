const BaseGenerator = require('../BaseGenerator');

/**
 * @generator
 */
class AppGenerator extends BaseGenerator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('workspaces', { type: Array, required: true });
    this.argument('moduleLoaderConfigSrc', { type: String, required: true });
  }

  default() {
    const {moduleLoaderConfigSrc, workspaces} = this.options;

    this.composeWith(require.resolve('../module-loader-config'), {
      options: {moduleLoaderConfigSrc, workspaces},
    });
  }
}

module.exports = AppGenerator;
