"use strict"
var assert = require("assert");
var express = require("express");
var app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    let db = client.db("TROC");
    assert.equal(null, err);
    
    app.get("/biens/:type", (req, res) => {
	console.log("route: /biens/:type");
        db.collection("biens").find({"type":req.params.type}).toArray((err, documents)=> {
	    let json = [];
            for (let doc of documents) {
                console.log(doc);
		json.push(doc);
            }
	    res.setHeader("Content-type", "application/json");
	    res.end(JSON.stringify(json));
	});
    });
    
    app.post("/membre", (req, res) => {
	console.log("route sur post : /membre");
	console.log(req.body);
	for (let prop in req.body) {
            console.log(prop+" : "+req.body[prop]);
	}
	res.setHeader("Content-type", "text/raw");	
	try {
            db.collection("membres").insertOne(req.body);
	    res.end("Insertion réussie");	    
	}
	catch(e) {
	    res.end("Error "+e);
	}
    });
});

app.listen(8888);
