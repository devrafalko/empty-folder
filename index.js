/* global Function, Promise */
const path = require('path');
const fs = require('fs');
const type = require('of-type');
const args = require('typeof-arguments');
const list = require('list-contents');
module.exports = function(root,callback){
  var isCallbackDefined = type(callback,Function);
  if(!args(arguments,[String,[Function,undefined]],(o)=>{
    var err = new TypeError(o.message);
    returnError(err);
  })) return;
  const absRootPath = path.resolve(root);
  fs.stat(absRootPath,(err,stats)=>{
    var exists = type(err,null);
    var isDir = type(stats,'Stats')&&stats.isDirectory();
    if(exists&&isDir) listContents(absRootPath);
    if(exists&&!isDir){
      returnError(new Error(`The item of the path '${absRootPath}' is not a directory.`));
      return;
    }
    if(!exists){
      returnError(new Error(`The directory of the path '${absRootPath}' does not exist.`));
      return;
    }
  });
  function listContents(absRootPath){
    list(absRootPath,(o)=>{
      if(o.error){
        returnError(new Error(`Could not get the access to the contents of the '${absRootPath}' directory.`));
        return;
      } else {
        o.dirs.sort((a,b)=>b.length-a.length);
        var filePromises = [];
        var dirPromises = [];
        for(let i in o.files){
          let absFile = path.resolve(absRootPath,o.files[i]);
          let prms = new Promise((resolve,reject)=>{
            fs.unlink(absFile,(err)=>{
              if(err) reject(`Could not remove '${absFile}' file.`);
              if(!err) resolve();
            });
          });
          filePromises.push(prms);
        }
        for(let i in o.dirs){
          let absDir = path.resolve(absRootPath,o.dirs[i]);
          let prms = function(){
            return new Promise((resolve,reject)=>{
              fs.rmdir(absDir, (err)=>{
                if(err) reject(`Could not remove '${absDir}' folder.`);
                if(!err) resolve();
              });
            });
          };
          dirPromises.push(prms);
        }
        Promise.all(filePromises).then(()=> {
          var chain;
          for(var i in dirPromises){
            if(chain) chain = chain.then(dirPromises[i]);
            if(!chain) chain = dirPromises[i]();
          }
          if(chain){
            chain.then(()=>{
              if(isCallbackDefined) callback(null);
            }).catch((err)=>{
              returnError(new Error(err));
            });
          } else {
            if(isCallbackDefined) callback(null);
          }
        }).catch((err)=>{
          returnError(new Error(err));
        });
      }
    });
  }
  function returnError(err){
    if(!isCallbackDefined) throw err;
    if(isCallbackDefined) callback(err);
  }
};