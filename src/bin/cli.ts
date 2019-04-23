#!/usr/bin/env node

import yargs from 'yargs';
import getNodeVersions from '../index';


yargs.option('output', {
  describe: '',
  choices: ['json']
});

yargs.alias('o', 'output');

yargs.showHelpOnFail(true, 'See --help for usage instructions.');
yargs.wrap(yargs.terminalWidth());
yargs.version();
yargs.strict();
yargs.help();


async function main() {
  // Parse command-line arguments, bail on --help, --version, etc.
  const args = yargs.argv;

  const releases = await getNodeVersions();

  if (args.output === 'json') {
    process.stdout.write(`${JSON.stringify(releases, undefined, 2)}\n`);
    return;
  }

  console.log(`Latest:\t${releases.latest.version.full}`);
  console.log(`LTS:\t${releases.lts.version.full}`);
}


export default main();
