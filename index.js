'use strict';
const util = require('util');
const child_process = require('child_process');
const exec = util.promisify(child_process.exec);

const commands = [
    'git show-branch -a', //  Get git branch
    'grep \'\*\'',
    'grep -v "$(git rev-parse --abbrev-ref HEAD)"',
    'head -n1',
    'sed \'s/.*\\[\\(.*\\)\\].*/\\1/\'',
    'sed \'s/[\\^~].*//\''
];

function parent (cwd) {
   return exec(commands.join(' | '), { cwd: cwd || process.cwd() })
       .then(({ stdout }) => stdout.trim())
}

parent.sync = function (cwd) {
    return child_process.execSync(commands.join(' | '), { cwd: cwd || process.cwd() }).toString().trim()
};

module.exports = parent;
