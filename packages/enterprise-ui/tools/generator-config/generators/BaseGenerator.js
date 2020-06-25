const Generator = require('yeoman-generator');

/**
 * @generator
 */
class BaseGenerator extends Generator {
  createFile(templatePath, rootPath, context, templateOptions, copyOptions) {
    this.fs.copyTpl(
      this.templatePath(templatePath),
      this.destinationPath(rootPath),
      context,
      templateOptions,
      copyOptions,
    );
  }
}

module.exports = BaseGenerator;
