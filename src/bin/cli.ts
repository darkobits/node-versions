#!/usr/bin/env node

import yargs from 'yargs';
import getNodeVersions from '../index';

yargs.usage('Fetches information about the latest Node versions.');

yargs.option('output', {
  describe: 'Output configuration.',
  choices: ['json']
});

yargs.alias('o', 'output');

yargs.example('$0', 'Show most retent \'latest\' and \'LTS\' release versions.');
yargs.example('$0 -o json', 'Print information about the most retent \'latest\' and \'LTS\' release versions as a JSON object.');

yargs.showHelpOnFail(true, 'See --help for usage instructions.');
yargs.wrap(yargs.terminalWidth());
yargs.alias('v', 'version');
yargs.alias('h', 'help');
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
