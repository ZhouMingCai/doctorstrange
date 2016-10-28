'use strict'

import Decompress from 'decompress';
import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';
import unzip from 'unzip';

// module.exports = {
//     getJsBundle(file, callback){
//         Decompress(file.path, 'dist').then(files => {
//             for (let i in files) {
//                 if (files.hasOwnProperty(i)) {
//                     if(path.basename(files[i].path) == 'main.jsbundle'){
//                         let timestamp = process.hrtime()
//                         fs.writeFile(__dirname + '/temp-'+timestamp+'main.jsbundle', files[i].data, function(err) {
//                           if(err) {
//                               return callback(err, null);
//                           } else {
//                               let data = {
//                                 jsbundle: __dirname + '/temp-'+timestamp+'main.jsbundle'
//                               }
//                               callback(null, data);
//                           }
//
//                         });
//                     }
//                 }
//             }
//         });
//     },
// };
//
module.exports = {
    getJsBundle(file, callback){
        let zip = new JSZip();
        Decompress(file.path, 'dist').then(files => {
            for (let i in files) {
                if (files.hasOwnProperty(i)) {
                    let pathName = files[i].path;
                    if(path.basename(pathName) == 'main.jsbundle'){
                        zip.file('doctor.jsbundle', files[i].data);
                    }
                    if (pathName.indexOf('assets') != -1) {
                        let index = pathName.indexOf('assets');
                        if (files[i].type == 'directory') {
                            zip.folder(pathName.substring(index));
                        } else if (files[i].type == 'file') {
                            zip.file(pathName.substring(index), files[i].data);
                        }
                    }
                }
            }

        }).then(() => {
            zip.generateAsync({type:"nodebuffer"})
            .then((content) => {
                callback(null, content);
            });
        });

    },
};
