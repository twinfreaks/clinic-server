var express = require('express');
var router = express.Router();
var config = require('../config');
var uniqueFilename = require('unique-filename');
var pathmod = require('path');

module.exports = function (router) {
    router.post('/', function(req, res) {
        if (!req.files){
            return res.status(400).send('No files were uploaded.');
        }
        
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
        let image = req.files.file;
        let ext = pathmod.extname(req.files.file.name);
        let name = uniqueFilename('./files/doctors-photo/');
        
        // Use the mv() method to place the file somewhere on your server 
        image.mv(name + ext, function(err) {
            if (err){
                return res.status(500).send(err);
            }
            res.json({"message": "File uploaded!", fileName: name + ext});
        });
    });
}