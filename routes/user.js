// grab the things we need
var mongoose = require('mongoose');

var mongodb = require('mongodb');
var nconf = require('nconf');


// tell nconf which config file to use
nconf.env();
nconf.file({ file: 'config.json' });

var url = nconf.get("HOST");
var MongoClient = mongodb.MongoClient;

exports.Create = function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {    
            console.log('Connection established to', url);
            var collection = db.collection('user');

            //Create user
            var user= req.body;//{name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user']};
            
             // Insert some users
            collection.insert([user], function (err, result) {
            if (err) {
                console.log(err);
            }});
        }
    });
};

exports.get=function(req,res){
  MongoClient.connect(url,function(err,db){
       if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {    
            console.log('Connection established to', url);
            var collection = db.collection('user');
            collection.find({name: 'modulus user'}).toArray(function (err, result) {
            if (err) {
                console.log(err);
            } else if (result.length) {
                console.log('Found:', result);
            } else {
                console.log('No document(s) found with defined "find" criteria!');
         }}); 
  }});    
};