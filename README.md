# git-branch-parent

> Get the parent (or source) branch of current branch from the git repository.


## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save git-branch-parent
```

## Usage

```js
const parent = require('git-branch-parent');
```

Optionally pass the cwd (current working directory) as the first argument.

**Promise**

```js
parent('some/path')
  .then(name => console.log('Parent Branch:', name))
  .catch(console.error)
```

**Sync**

```js
console.log('Parent Branch:', parent.sync())
```

## Contributing



### Contributors

* [Roberto14](https://github.com/Roberto14) |

### License

Released under the [MIT License](LICENSE).