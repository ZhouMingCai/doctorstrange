'use strict'

import Decompress from 'decompress';
import plist from 'simple-plist';
import fs from 'fs';

module.exports = {
    getIpaInfo(file, callback){

        Decompress(file, 'dist').then((files) => {
            for (var i in files) {
                if (files.hasOwnProperty(i)) {
                    if(files[i].basename == 'Info.plist'){
                    let timestamp = process.hrtime()
                        fs.writeFile(__dirname + '/temp-'+timestamp+'.plist', files[i].contents, function(err) {
                          if(err) {
                              return cb(err, null);
                          }
                          let data = {
                            ipa: fs.statSync(filePath),
                            plist: plist.readFileSync(__dirname + '/temp-'+timestamp+'.plist')
                          }
                          cb(null, data);
                          fs.unlinkSync(__dirname + '/temp-'+timestamp+'.plist');
                        });
                    }
                }
            }
        });
    },

    getJsBundle(file, callback){
        new Decompress({mode: '755'})
        .src(file)
        .use(Decompress.zip({strip: 2}))
        .run((err, files) => {
            if (err) {
                return callback(err, null);
            } else {
                for (var i in files) {
                    if (files.hasOwnProperty(i)) {
                        if(files[i].basename == 'main.jsbundle'){
                        let timestamp = process.hrtime()
                            fs.writeFile(__dirname + '/temp-main-'+timestamp+'.jsbundle', files[i].contents, function(err) {
                              if(err) {
                                  return cb(err, null);
                              }
                              let data = {
                                ipa: fs.statSync(filePath),
                                plist: plist.readFileSync(__dirname + '/temp-main-'+timestamp+'.jsbundle')
                              }
                              cb(null, data);
                              fs.unlinkSync(__dirname + '/temp-main-'+timestamp+'.jsbundle');
                            });
                        }
                    }
                }
            }
        });
    }
};
