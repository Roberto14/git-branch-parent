'use strict';
const fs = require('fs');
const util = require('util');
const find = require('findup-sync');
const readFile = util.promisify(fs.readFile);
const exec = util.promisify(require('child_process').exec);

function branch(cwd, callback) {
    if (typeof cwd === 'function') {
        callback = cwd;
        cwd = null;
    }

    const promise = readFile(gitHeadPath(cwd)).then(buf => parseBranch(buf));

    if (typeof callback === 'function') {
        promise.then(res => callback(null, res)).catch(callback);
        return;
    }

    return promise;
}

branch.sync = function(cwd) {
    return parseBranch(fs.readFileSync(gitHeadPath(cwd)));
};

function stripNewlines(input) {
    const newlinesPattern = /\r?\n|\r/
    return input.replace(newlinesPattern, '')
}

function gitMergeBase(ref) {
    const command = `git merge-base --fork-point ${ref}`
    return exec(command).then(({stdout})=> stripNewlines(stdout))
}

function getRef(cwd) {
    //TODO: regex instead of split to match the ref
    return readFile(gitHeadPath(cwd))
        .then(buf => buf.toString().split('ref: ')[1])
        .then(ref => stripNewlines(ref))
}

function getBranchesByCommit(commitHash) {
    const command = `git branch --contains ${commitHash}`
    return exec(command).then(({stdout})=> stripNewlines(stdout))
}

function findParentBranch(branches) {
    return new Promise(function(resolve, reject) {
        const branchList = branches.split('/n')
        if(branchList.length < 2) {
            reject('ERROR: There is no source/parent branch')
        }
        resolve(branchList[1])
    })
}

function parent (cwd) {
    return getRef(cwd)
        .then(gitMergeBase)
        .then(getBranchesByCommit)
        .then(findParentBranch)
        .then(console.log)
        .catch(console.error)
}

parent()
module.exports = parent



// Utils
function gitHeadPath(cwd) {
    const filepath = find('.git/HEAD', { cwd: cwd || process.cwd() });

    if (!fs.existsSync(filepath)) {
        throw new Error('.git/HEAD does not exist');
    }
    return filepath;
}