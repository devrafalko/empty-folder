const path = require('path');
const fs = require('fs');
const args = require('typeof-arguments');
const listContents = require('list-contents');
const moveOn = require('move-on');

module.exports = function(root,remove,callback){
  const functionList = [
    validateArguments,
    setUserContext,
    validateRoot,
    getChildrenPaths,
    removeFiles,
    removeFolders
  ];
  const userContext = {
    args:arguments,
    returned:{
      error:null,
      removed:[],
      failed:[]
    }
  };
  
  moveOn(functionList,userContext,onResolve,onReject);
  
  function validateArguments(resolve){
    if(args(this.args,[String,Boolean,Function],(o)=>{
      var err = new TypeError(o.message);
      throw err;
    })) resolve();
  }
  
  function setUserContext(resolve){
    this.callback = callback;
    this.rootAbsolute = path.resolve(root);
    this.removeRoot = remove;
    resolve();
  }
  
  function validateRoot(resolve,reject){
    fs.stat(this.rootAbsolute,(err,stats)=>{
      var exists = err === null;
      var isDir = stats instanceof fs.Stats && stats.isDirectory();
      if(exists&&isDir) return resolve();
      if(exists&&!isDir) return reject(new Error(`The given path "${this.rootAbsolute}" is not a directory.`));
      if(!exists) return reject(new Error(`The given path "${this.rootAbsolute}" does not exist or is inaccessible.`));
    });
  }
  
  function getChildrenPaths(resolve){
    listContents(this.rootAbsolute,(o)=>{
      this.dirs = o.dirs.sort((a,b)=>b.length-a.length);
      this.files = o.files;
      for(var item of o.inaccessible){
        this.returned.failed.push(path.resolve(this.rootAbsolute,item));
      }
      resolve();
    });
  }
  
  function removeFiles(resolve){
    var iter = 0;
    if(!this.files.length) return resolve();
    for(let file of this.files){
      const fileAbsolute = path.resolve(this.rootAbsolute,file);
      fs.unlink(fileAbsolute,(err)=>{
        this.returned[err ? 'failed':'removed'].push(fileAbsolute);
        if(++iter===this.files.length) resolve();
      });
    }
  }
  
  function removeFolders(resolve){
    var functionList = [];
    var userContext = this;
    if(this.removeRoot) this.dirs.push(this.rootAbsolute);
    for(let folder of this.dirs){
      functionList.push(function(resolve){
        const folderAbsolute = path.resolve(this.rootAbsolute,folder);
        fs.rmdir(folderAbsolute,(err)=>{
          this.returned[err ? 'failed':'removed'].push(folderAbsolute);
          return resolve();
        });
      });
    }
    moveOn(functionList,userContext,resolve,resolve);
  }
  
  
  function onResolve(){
    var l = this.returned.failed.length;
    if(l) this.returned.error = new Error(`The ${l} item${l>1?'s':''} could not be removed.`);
    this.callback(this.returned);
  }
  
  function onReject(c,err){
    this.returned.error = err;
    this.callback(this.returned);
  }
  
};
