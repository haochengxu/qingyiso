var mongoClient = require('mongodb').MongoClient

var insertDocuments = function(db, collection, doc, callback) {
    // Get the documents collection
    var collection = db.collection(collection);
    // Insert some documents
    collection.insertMany([doc], function(err, result) {
        callback(result);
    });
}
var findDocuments = function(db, collec, callback) {
    // Get the documents collection
    console.log(collec)
    var collection = db.collection(collec);
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        // console(docs);
        callback(docs);
    });
}

module.exports = {
    mongoClient,
    insertDocuments,
    findDocuments
}