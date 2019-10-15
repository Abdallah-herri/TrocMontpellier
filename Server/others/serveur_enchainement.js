"use strict"
var assert = require("assert");
var express = require("express");
var app = express();
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    let db = client.db("TROC");
    assert.equal(null, err);
    
    app.get("/biens/:nom", (req, res) => {

	console.log("route: /biens/:nom");

        db.collection("biens").find({"nom":req.params.nom}).toArray((err, documents)=> {

            let collectionPreteurs = [];

    	    res.setHeader("Content-type", "application/json");

    	    let nbResultats = documents.length;
    	    let numResultats = 0;

            for (let doc of documents) {
               db.collection("membres").find({"email":doc.preteur}).toArray((err, documents)=> {
               collectionPreteurs.push(documents[0]);
    	       numResultats++;
    	       if (numResultats == nbResultats) res.end(JSON.stringify(collectionPreteurs));
               });
            }
	});	
    });
});

app.listen(8888);
