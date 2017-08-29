# Description
`empty-folder` is a module that removes *(asynchronously)* the contents of the specified directory with all of its subfolders and subfiles.

* Any bugs found? Give me to know on **dev.rafalko@gmail.com** or on **[GitHub](https://github.com/devrafalko/empty-folder)**

# Installation
`npm install empty-folder`

```javascript
const empty = require('empty-folder');
```

# Usage
### `empty(path,callback)`

```javascript
const empty = require('empty-folder');

empty('./dist',(err)=>{
  if(err) console.error(err);
});
```

#### `path` **[String]**
* It should indicate the path *(directory)* which contents should be removed.

#### `callback` **[Function|undefined]**
* It is fired **once** when all folders and files are successfully removed or if some error occures.
* if `callback` is `[Function]`, the `[Error|null]` argument is passed through it
* if `callback` is `[undefined]`, if any Error occurs, it is `thrown`

### How it works under the hood
* takes the paths of all (sub)files and (sub)folders
* removes all (sub)files with native nodejs `fs.unlink`
* removes all (sub)folders in order *(beginning with the most rooted)* with native nodejs `fs.rmdir`
* if some of the files or folders cannot be removed, the Error is passed through the `callback` function *(or thrown)*