'use strict';

var httpJson = require('./http-json');
var urls = require('./urls.json');
var _ = require('lodash');

var Store = function(parameters) {
    this.ID = parameters.ID;
};

Store.prototype.getInfo = function(callback) {
    if( !this.ID || !callback){
        if(callback)
            callback(
                {
                    success: false,
                    message: 'A callback is required to get store info'
                }
            );
        return;
    }

    httpJson.get(urls.store.info.replace('${storeID}', this.ID), callback);
};

Store.prototype.getMenu = function(callback, lang) {
    if( !this.ID || !callback){
        if(callback)
            callback({
                success: false,
                message: 'A callback is required to get a store menu'
            });
        return;
    }

    if(!lang)
        lang = 'en';

    var url = urls.store.menu.replace('${storeID}', this.ID)
        .replace('${lang}', lang);

    httpJson.get(url, callback);
};

Store.prototype.getFriendlyNames = function(callback, lang) {
  if( !this.ID || !callback){
      if(callback)
          callback({
              success: false,
              message: 'A callback is required to get a store menu'
          });
      return;
  }

  if(!lang)
      lang = 'en';

  var url = urls.store.menu.replace('${storeID}', this.ID)
      .replace('${lang}', lang);

  httpJson.get(url, function(result) {
    var itemMapping = [];
    _.forEach(result.result.Variants, function(value, key) {
      var json = {};  //Because JS is weird. You can't use variables as keys.
      json[key] = value.Name
      itemMapping.push(json);
    });

    callback({ success: true, result: itemMapping });
  });
}

module.exports = Store;
