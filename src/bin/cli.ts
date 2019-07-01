#!/usr/bin/env node

import yargs, {Arguments} from 'yargs';
import getNodeVersions from '../node-versions';


export interface NodeVersionsArguments extends Arguments {
  output: 'json' | undefined;
}


yargs.command({
  command: '*',
  builder: command => {
    command.usage('Fetches information about the latest Node versions.');

    command.option('output', {
      describe: 'Output configuration.',
      choices: ['json']
    });

    command.alias('o', 'output');

    command.example('$0', 'Show most retent \'latest\' and \'LTS\' release versions.');
    command.example('$0 -o json', 'Print information about the most retent \'latest\' and \'LTS\' release versions as a JSON object.');

    return command;
  },
  handler: async (args: NodeVersionsArguments) => {
    const releases = await getNodeVersions();

    if (args.output === 'json') {
      process.stdout.write(`${JSON.stringify(releases, undefined, 2)}\n`);
      return;
    }

    console.log(`Latest:\t${releases.latest.version.full}`);
    console.log(`LTS:\t${releases.lts.version.full}`);
  }
});


yargs.showHelpOnFail(true, 'See --help for usage instructions.');
yargs.wrap(yargs.terminalWidth());
yargs.alias('v', 'version');
yargs.alias('h', 'help');
yargs.version();
yargs.strict();
yargs.help();


// Parse command-line arguments, bail on --help, --version, etc.
export default yargs.argv;
