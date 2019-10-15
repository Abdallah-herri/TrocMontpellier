"use strict"
var assert = require("assert");
var express = require("express");
var app = express();
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    let db = client.db("TROC");
    assert.equal(null, err);
    
    app.get("/biens/:type", (req, res) => {
	console.log("route: /biens/:type");
        db.collection("biens").find({"type":req.params.type}).toArray((err, documents)=> {
	    // la création de json ne sert à rien ici
	    // on pourrait directement renvoyer documents
	    let json = [];
            for (let doc of documents) {
                console.log(doc);
		json.push(doc);
            }
	    res.setHeader("Content-type", "application/json");
	    res.end(JSON.stringify(json));
	});
	
    });
});

app.listen(8888);
