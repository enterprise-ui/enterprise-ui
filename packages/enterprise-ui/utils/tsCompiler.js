const ts = require('typescript');
const fs = require('fs');
const path = require('path');

function reportDiagnostics(diagnostics) {
  diagnostics.forEach((diagnostic) => {
    let message = 'Error';
    if (diagnostic.file) {
      const where = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
      message += ' ' + diagnostic.file.fileName + ' ' + where.line + ', ' + where.character + 1;
    }
    message += ': ' + ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
    console.log(message);
  });
}

function readConfigFile(configFileName) {
  // Read config file
  const configFileText = fs.readFileSync(configFileName).toString();

  // Parse JSON, after removing comments. Just fancier JSON.parse
  const result = ts.parseConfigFileTextToJson(configFileName, configFileText);
  const configObject = result.config;
  if (!configObject) {
    reportDiagnostics([result.error]);
  }

  // Extract config infromation
  const configParseResult = ts.parseJsonConfigFileContent(
    configObject,
    ts.sys,
    path.dirname(configFileName),
  );
  if (configParseResult.errors.length > 0) {
    reportDiagnostics(configParseResult.errors);
  }
  return configParseResult;
}

const tsCompiler = (configFileName) => {
  const config = readConfigFile(configFileName);

  let program = ts.createProgram(config.fileNames, config.options);
  let emitResult = program.emit();

  let allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

  allDiagnostics.forEach((diagnostic) => {
    if (diagnostic.file) {
      let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
      let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
      console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
    } else {
      console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
    }
  });

  let exitCode = emitResult.emitSkipped ? 1 : 0;
  console.log(`Process exiting with code '${exitCode}'.`);
};

module.exports = tsCompiler;
