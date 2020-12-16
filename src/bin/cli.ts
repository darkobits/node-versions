#!/usr/bin/env node

import { EOL } from 'os';

import cli from '@darkobits/saffron';
import getNodeVersions from '../node-versions';

import { NodeVersionsArguments } from 'etc/types';


cli.command<NodeVersionsArguments>({
  command: '*',
  builder: ({ command }) => {
    command.option('output', {
      describe: 'Output configuration.',
      choices: ['json']
    });

    command.alias('o', 'output');

    command.example('$0', 'Show most recent \'latest\' and \'LTS\' release versions.');
    command.example('$0 -o json', 'Print information about the most recent \'latest\' and \'LTS\' release versions as a JSON object.');

    return command;
  },
  handler: async ({ argv }) => {
    const releases = await getNodeVersions();

    if (argv.output === 'json') {
      process.stdout.write(`${JSON.stringify(releases, undefined, 2)}${EOL}`);
      return;
    }

    process.stdout.write(`Latest:\t${releases.latest.version.full}${EOL}`);
    process.stdout.write(`LTS:\t${releases.lts.version.full}${EOL}`);
  }
});


cli.init();
