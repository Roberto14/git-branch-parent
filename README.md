# git-branch

> Get the source (or parent) branch of the current branch from the git repository.


## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save git-source-branch
```

## Usage

```js
const sourceBranch = require('git-source-branch');
```

Optionally pass the cwd (current working directory) as the first argument.

**Promise**

```js
sourceBranch('some/path')
  .then(name => console.log('Source Branch:', name))
  .catch(console.error)
```

**Sync**

```js
console.log('Source Branch:', sourceBranch.sync())
```

## Contributing



### Contributors

* [Roberto14](https://github.com/Roberto14) |

### License

Released under the [MIT License](LICENSE).