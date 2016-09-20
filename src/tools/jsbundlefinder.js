'use strict'

import Decompress from 'decompress';
import fs from 'fs';
import path from 'path';

module.exports = {
    getJsBundle(file, callback){
        Decompress(file.path, 'dist').then(files => {
            for (var i in files) {
                if (files.hasOwnProperty(i)) {
                    if(path.basename(files[i].path) == 'main.jsbundle'){
                        let timestamp = process.hrtime()
                        fs.writeFile(__dirname + '/temp-'+timestamp+'main.jsbundle', files[i].data, function(err) {
                          if(err) {
                              return callback(err, null);
                          } else {
                              let data = {
                                jsbundle: __dirname + '/temp-'+timestamp+'main.jsbundle'
                              }
                              callback(null, data);
                          }

                        });
                    }
                }
            }
        });
    },
};
