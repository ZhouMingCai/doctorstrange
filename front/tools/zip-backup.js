'use strict'

var ERR_BAD_FORMAT = "File format is not recognized.";
var ERR_CRC = "CRC failed.";
var ERR_ENCRYPTED = "File contains encrypted entry.";
var ERR_ZIP64 = "File is using Zip64 (4gb+ file size).";
var ERR_READ = "Error while reading zip file.";
var ERR_WRITE = "Error while writing zip file.";
var ERR_WRITE_DATA = "Error while writing file data.";
var ERR_READ_DATA = "Error while reading file data.";
var ERR_DUPLICATED_NAME = "File already exists.";
var CHUNK_SIZE = 512 * 1024;

var TEXT_PLAIN = "text/plain";

var appendABViewSupported;

module.exports = (obj) => {
    try {
        appendABViewSupported = new Blob([ new DataView(new ArrayBuffer(0)) ]).size === 0;
    } catch(e){
        console.log(e);
    }



}

class Crc32 {

    constructor(){
        super(this);
        this.crc = -1;
    }

    append(data) {
        var crc = this.crc | 0, table = this.table;
		for (var offset = 0, len = data.length | 0; offset < len; offset++)
			crc = (crc >>> 8) ^ table[(crc ^ data[offset]) & 0xFF];
		this.crc = crc;
    }

    get(){
        return ~this.crc;
    }

    table = () => {
        var i, j, t, table = []; // Uint32Array is actually slower than []
		for (i = 0; i < 256; i++) {
			t = i;
			for (j = 0; j < 8; j++)
				if (t & 1)
					t = (t >>> 1) ^ 0xEDB88320;
				else
					t = t >>> 1;
			table[i] = t;
		}
		return table;
    }
}

class BOOP {
    append(bytes, onprogress) {
		return bytes;
	};

    flush(){

    }
}


function blobSlice(blob, index, length) {
    if (index < 0 || length < 0 || index + length > blob.size)
        throw new RangeError('offset:' + index + ', length:' + length + ', size:' + blob.size);
    if (blob.slice)
        return blob.slice(index, index + length);
    else if (blob.webkitSlice)
        return blob.webkitSlice(index, index + length);
    else if (blob.mozSlice)
        return blob.mozSlice(index, index + length);
    else if (blob.msSlice)
        return blob.msSlice(index, index + length);
}

function getDataHelper(byteLength, bytes) {
    var dataBuffer, dataArray;
    dataBuffer = new ArrayBuffer(byteLength);
    dataArray = new Uint8Array(dataBuffer);
    if (bytes)
        dataArray.set(bytes, 0);
    return {
        buffer : dataBuffer,
        array : dataArray,
        view : new DataView(dataBuffer)
    };
}

class Reader {
    constructor(){
        super(this);
    }
}

class TextReader extends Reader {
    constructor(text){
        super(this);
    }


    init = (callback, onerror) {
        var blob = new Blob([ text ], {
            type : TEXT_PLAIN
        });
        this.blobReader = new BlobReader(blob);
        this.blobReader.init(function() {
            this..size = this.blobReader.size;
            callback();
        }, onerror);
    }

    readUint8Array = (index, length, callback, onerror) => {
        this.blobReader.readUint8Array(index, length, callback, onerror);
    }

}

class Data64URIReader extends Reader {
    constructor(dataURI){
        super(this);
    }

    init = (callback) => {
        var dataEnd = this.dataURI.length;
        while (this.dataURI.charAt(dataEnd - 1) == "=")
            dataEnd--;
        this.dataStart = this.dataURI.indexOf(",") + 1;
        this.size = Math.floor((dataEnd - this.dataStart) * 0.75);
        callback();
    }
    readUint8Array = (index, length, callback) => {
        var i, data = getDataHelper(length);
        var start = Math.floor(index / 3) * 4;
        var end = Math.ceil((index + length) / 3) * 4;
        var bytes = obj.atob(this.dataURI.substring(start + this.dataStart, end + dataStart));
        var delta = index - Math.floor(start / 4) * 3;
        for (i = delta; i < delta + length; i++)
            data.array[i - delta] = bytes.charCodeAt(i);
        callback(data.array);
    }

}

class BlobReader extends Reader {
    constructor(blob){
        super(this);
        this.blob = blob;
    }

    init = (callback) => {
        that.size = this.blob.size;
        callback();
    }

    readUint8Array = (index, length, callback, onerror) => {
        var reader = new FileReader();
        reader.onload = function(e) {
            callback(new Uint8Array(e.target.result));
        };
        reader.onerror = onerror;
        try {
            reader.readAsArrayBuffer(blobSlice(this.blob, index, length));
        } catch (e) {
            onerror(e);
        }
    }
}


class Writer {
    constructor(this){
        super(this);
    }
}

class TextWriter extends Writer {
    constructor(this){
        super(this);
    }

    getData = (callback, onerror) => {
        var reader = new FileReader();
        reader.onload = function(e) {
            callback(e.target.result);
        };
        reader.onerror = onerror;
        reader.readAsText(this.blob, encoding);
    }

    init = (callback) => {
        this.blob = new Blob([], {
            type : TEXT_PLAIN
        });
        callback();
    }

    writeUint8Array = (array, callback) => {
        blob = new Blob([ blob, appendABViewSupported ? array : array.buffer ], {
            type : TEXT_PLAIN
        });
        callback();
    }
}






function onerror_default(error) {
    console.error(error);
}
