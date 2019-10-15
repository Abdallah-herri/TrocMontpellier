"use strict"
var assert = require("assert");
var express = require("express");
var MongoClient = require("mongodb").MongoClient;
var crypto = require("crypto");

var app = express();
var url = "mongodb://localhost:27017";

var session;

app.use(express.json());
app.use(function(req, res, next){
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  next();
})
app.use(express.urlencoded({extended:true}));

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    let db = client.db("allovoisins");
    assert.equal(null, err);


      //login
      app.post("/login", (req, res) => {
          let json = [];
          console.log("route sur post : /login");
          db.collection("membres").findOne({"email":req.body.email}, (err, documents)=> {

            if(documents === null)
            {
              json.push({
                "success" : false,
              });
            }
            else if (documents.password != req.body.password) {
              json.push({
                "success" : false,
              });
            }
            else {
              json.push({
                "success" : true,
                documents
              });
            }

            res.end(JSON.stringify(json));
          });

      });


      //Register
      app.post("/register", (req, res) => {
          let json = [];
          console.log("route sur post : /register");
          db.collection("membres").findOne({"email":req.body.email}, (err, documents)=> {
            if(documents === null)
            {
              db.collection("membres").find().sort({idmembre : -1}).toArray((err, result)=> {
                  req.body.idmembre = (result[0].idmembre != null) ? JSON.stringify(++result[0].idmembre) : '1';
                  db.collection("membres").insertOne(req.body);
                  json.push({
                    "success" : true,
                    "idmembre" : req.body.idmembre
                  });
                  res.end(JSON.stringify(json));
              });
            }
            else
            {
              json.push({
                "success" : false
              });
              res.end(JSON.stringify(json));
            }
          });
      });






    //creation d'un bien :
    app.post("/creationBien", (req, res) => {
		console.log("route sur post : /creationBien");
    let json_response = [];
    let json_bien = [];
    let json_disponibilities = [];
    let json_mots_clefs = [];
    db.collection("biens").find().sort({idBien : -1}).toArray((err, result)=> {
        let idBien = (result.length != 0) ? JSON.stringify(++result[0].idBien) : "1";

        json_bien.push({
      		"idBien" : idBien,
      		"idmembre" : req.body.idmembre,
      		"nom" : req.body.nom,
      		"descriptif" : req.body.descriptif,
      		"PrixNeuf" : req.body.PrixNeuf
      	});

        db.collection("biens").insertOne(json_bien[0]);


        json_disponibilities.push({
      		"bienOuService" : "bien",
      		"idBienOuService" : idBien,
          "disponibilites" : req.body.disponibilites
        });



        db.collection("disponibilites").find().sort({"disponibilites.idDisponibilite" : -1}).toArray((err, documents)=>{
          let r, count;
          if( documents.length != 0 )
          {
            r = documents[0].disponibilites;
            count = parseInt(r[r.length - 1].idDisponibilite);
          }
          else
          {
            count = 0;
          }

          for (var i = 0; i < json_disponibilities[0].disponibilites.length; i++) {
              count++;
              json_disponibilities[0].disponibilites[i].idDisponibilite = count;
          }
          console.log(json_disponibilities[0])
          db.collection("disponibilites").insertOne(json_disponibilities[0]);
        });



        json_mots_clefs.push({
          "idB_S" : idBien,
          "bienOuService" : "bien",
      		"motClef" : req.body.tags
        });

        db.collection("descriptifs").insertOne(json_mots_clefs[0]);

        json_response.push({
          "success" : true,
        });
        res.end(JSON.stringify(json_response));
    });
    });


    //creation d'un service
    app.post("/creationService", (req, res) => {
		console.log("route sur post : /creationService");
    let json_response = [];
    let json_bien = [];
    let json_disponibilities = [];
    let json_mots_clefs = [];
    db.collection("services").find().sort({idBien : -1}).toArray((err, result)=> {
        let idService = (result.length != 0) ? JSON.stringify(++result[0].idService) : "1";

        json_bien.push({
      		"idService" : idService,
      		"idmembre" : req.body.idmembre,
      		"nom" : req.body.nom,
      		"descriptif" : req.body.descriptif,
      		"PrixNeuf" : req.body.PrixNeuf
      	});

        db.collection("services").insertOne(json_bien[0]);


        json_disponibilities.push({
      		"bienOuService" : "service",
      		"idBienOuService" : idService,
          "disponibilites" : req.body.disponibilites
        });



        db.collection("disponibilites").find().sort({"disponibilites.idDisponibilite" : -1}).toArray((err, documents)=>{
          let r, count;
          if( documents.length != 0 )
          {
            r = documents[0].disponibilites;
            count = parseInt(r[r.length - 1].idDisponibilite);
          }
          else
          {
            count = 0;
          }

          for (var i = 0; i < json_disponibilities[0].disponibilites.length; i++) {
              count++;
              json_disponibilities[0].disponibilites[i].idDisponibilite = count;
          }

          db.collection("disponibilites").insertOne(json_disponibilities[0]);
        });



        json_mots_clefs.push({
          "idB_S" : idService,
          "bienOuService" : "service",
      		"motClef" : req.body.tags
        });

        db.collection("descriptifs").insertOne(json_mots_clefs[0]);

        json_response.push({
          "success" : true,
        });
        res.end(JSON.stringify(json_response));
    });
    });



    //récupérer biens/services
    app.post("/getbenefit", (req, res) => {
        console.log("route sur post : /getbenefit");
        let json = [];
        let collection = (req.body.type == "bien") ? "biens" : "services";

        db.collection(collection).find({"idmembre":req.body.idmembre}).toArray((err, documents)=> {

          if(documents === null)
          {
            json.push({
              "success" : false,
            });
          }
          else {
            json.push({
              "success" : true,
              documents

            });
          }

          res.end(JSON.stringify(json));
        });
    });


    //suppression d'un bien/service
    app.post("/removeBenefit", (req, res) => {
        console.log("route sur post : /removeBenefit");
        let json = [];
        let collection, type, id;

        if(req.body.type == "bien")
        {
          collection = "biens";
          type = "bien";
        }
        else
        {
          collection = "services";
          type = "service";
        }

        if(req.body.type == "bien")
        {
          db.collection(collection).deleteOne(({idBien : req.body.id}), function (err, doc) {
            json.push({
              "success" : true
            });
            res.end(JSON.stringify(json));
          });
        }
        else
        {
          db.collection(collection).deleteOne(({idService : req.body.id}), function (err, doc) {
                json.push({
                  "success" : true
                });
                res.end(JSON.stringify(json));
          });

        }

        db.collection("descriptifs").deleteOne({idB_S : req.body.id, bienOuService : type});
        db.collection("disponibilites").deleteOne({idBienOuService : req.body.id, bienOuService : type});
    });




    //récupérer biens/services
    app.post("/getbenefit", (req, res) => {
        console.log("route sur post : /getbenefit");
        let json = [];
        let collection = (req.body.type == "bien") ? "biens" : "services";

        db.collection(collection).find({"idmembre":req.body.idmembre}).toArray((err, documents)=> {

          if(documents === null)
          {
            json.push({
              "success" : false,
            });
          }
          else {
            json.push({
              "success" : true,
              documents

            });
          }

          res.end(JSON.stringify(json));
        });
    });


    //recherche
    app.post("/Search", (req, res) => {
        console.log("route sur post : /Search");
        let json = [];

        db.collection("descriptifs").find({motClef: {$in: req.body.mot_clef}}).toArray((err, desc) => {
          if(desc.length == 0)
          {
            res.end(JSON.stringify(json));
          }
          else
          {
            let taille = desc.length - 1;

            for (let i = 0; i < desc.length; i++) {
              json[i] = {
                "idBienOuService" : desc[i].idB_S,
                "nom" :"",
                "nom_m":"",
                "prenom_m":"",
                "description" : "",
                "prixNeuf" : "",
                "mots_clefs" : desc[i].motClef,
                "disponibilites" : ""
              }
              db.collection("disponibilites").find({"disponibilites.date" : { $eq : req.body.date_emprunt},"idBienOuService" : desc[i].idB_S, "bienOuService" : req.body.type}).toArray((err, dispo) => {
                  let finished = true;

                  if (dispo.length != 0) {
                    json[i].disponibilites = dispo[0].disponibilites;
                  }

                  if (taille == i)
                  {
                      res.end(JSON.stringify(json));
                  }
              });
            }
          }

        });
    });

    //details sur un bien
    app.post("/getDetails", (req, res) => {
        console.log("route sur post : /getDetails");
        let json = req.body.data;

        let type;
        let id;

        let taille = json.length - 1;
        let finished = true;

        if(req.body.type == "bien")
        {
          type = "biens";
          id = "idBien";

          for (let i = 0; i < json.length; i++) {
            finished = false;
            db.collection(type).find({idBien: json[i].idBienOuService.toString()}).toArray((err, biens) => {
              if(biens.length != 0)
              {
                 json[i].nom =  biens[0].nom;
                 json[i].bienOuService = "bien";
                 json[i].idmembre = biens[0].idmembre;
                 json[i].description =  biens[0].descriptif;
                 json[i].prixNeuf =  biens[0].PrixNeuf;
                 finished = true;
              }
              if(taille == i)
              {
                for (let j = 0; j < json.length; j++) {

                  db.collection("membres").find({idmembre: json[j].idmembre}).toArray((err, membres) => {

                    json[j].nom_m =  membres[0].nom;
                    json[j].prenom_m =  membres[0].prenom;

                    finished = true;
                    if(taille == i && taille == j )
                    {
                        res.end(JSON.stringify(json))
                    }
                  });
                }
              }
            });
          }

        }
        else
        {
          type = "services";
          id = "idService";

          for (let i = 0; i < json.length; i++) {
            finished = false;
            db.collection(type).find({idBien: json[i].idBienOuService.toString()}).toArray((err, biens) => {
              if(biens.length != 0)
              {
                 json[i].nom =  biens[0].nom;
                 json[i].bienOuService = "service";
                 json[i].idmembre = biens[0].idmembre;
                 json[i].description =  biens[0].descriptif;
                 json[i].prixNeuf =  biens[0].PrixNeuf;
                 finished = true;
              }
              if(taille == i)
              {
                for (let j = 0; j < json.length; j++) {

                  db.collection("membres").find({idmembre: json[j].idmembre}).toArray((err, membres) => {

                    json[j].nom_m =  membres[0].nom;
                    json[j].prenom_m =  membres[0].prenom;

                    finished = true;
                    if(taille == i && taille == j )
                    {
                        res.end(JSON.stringify(json))
                    }
                  });
                }
              }
            });
          }
        }
    });


    //reserverBenefit
    app.post("/reserverBenefit", (req, res) => {
        console.log("route sur post : /reserverBenefit");
        let index = parseInt(req.body.id)
        let json = [];
        var myquery = { "disponibilites.idDisponibilite" : index };
        var newvalues = { $set: {"disponibilites.$.isReserved": "1"} };

        db.collection("disponibilites").update(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log("1 document updated");
        });
    });

});

app.listen(8888);
