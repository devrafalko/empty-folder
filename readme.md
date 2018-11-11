# Description
`empty-folder` is a module that removes *(asynchronously)* the contents of the specified directory with all of its subfolders and subfiles and *(optionally)* the specified directory itself.

* Any bugs found? Give me to know on dev.rafalko@gmail.com or on [GitHub](https://github.com/devrafalko/empty-folder/issues)
* The `v1.*.*` documentation [\[link\]](https://github.com/devrafalko/empty-folder/tree/v1.0.0)
* The `v2.*.*` new features:
  * the `remove` argument has been added.
  * the `callback` function returns the [Object] argument with `error`, `removed` and `failed` property rather than [Error|null] argument.
  * the `empty-folder` function execution does not stop at the first failed element. It tries to remove as many elements as possible. Then fires `callback` function with the results.

# Installation
`npm install empty-folder`

```javascript
const empty = require('empty-folder');
```

# Usage
### `empty(path,remove,callback)`

```javascript
const empty = require('empty-folder');

empty('./dist', false, (o)=>{
  if(o.error) console.error(o.error);
  //console.log(o.removed);
  //console.log(o.failed);
});
```

#### `path` **[String]**
* It should indicate the path *(directory)* which children elements should be removed.

#### `remove` **[Boolean]**
* If `false`, it only empties the `path` directory.
* If `true`, it both empties the `path` directory and **removes** the `path` folder itself as well.
#### `callback` **[Function]**
* It is fired **once** when all folders and files are (un)successfully removed.
* The `callback` function is called with one [Object] argument of the following properties:
  * **`error`**: [Error] error, if the `path` does not exist or is inaccessible or if at least one child could not be removed. Otherwise `null`
  * **`removed`**: The [Array] list of absolute paths of all successfully removed files and folders of the `path` directory.
  * **`failed`**: The [Array] list of absolute paths of all `path` directory children that could not be removed.

### How it works under the hood
* takes the paths of all (sub)files and (sub)folders
* removes all (sub)files with native nodejs `fs.unlink`
* removes all (sub)folders in order *(beginning with the most rooted)* with native nodejs `fs.rmdir`
* if some of the files or folders cannot be removed, it is pushed into [Array] `failed` list.