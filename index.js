
//version 5 mongo
const express = require('express');
const app = express();

const equipes = require('./equipes.json');

app.use(express.json());

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'bdmonapi';

(async () => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);

        console.log('Connexion réussi avec Mongo');

        app.get('/equipes', async (req, res) => {
            const docs = await db.collection('equipe').find({}).toArray();
            res.status(200).json(docs);
        });

        app.get('/equipes/:id', async (req, res) => {
            const id = parseInt(req.params.id);
            try {
                const docs = await db.collection('equipe').find({id}).toArray();
                res.status(200).json(docs);
            } catch (err) {
                console.log(err);
                throw err;
            }
        });

        app.listen(82, () => {
            console.log('REST API via Express');
        });

    } catch (err) {
        console.log(err);
        throw err;
    }
})();

//version 4 mongo
/*const express = require('express')
const app = express()

const equipes = require('./equipes.json')

app.listen(82, () => {
    console.log('REST API via ExpressJS')
})

app.use(express.json());
/// Connexion à la base de données
const MongoClient = require('mongodb').MongoClient;
const url ='mongodb://localhost:27017';
const dbName ='bdmonapi';
let db
MongoClient.connect(url,function(err,client){
db=client.db(dbName);
console.log("Connexion réussi avec Mongo");
});

//Display tous les equipes
app.get('/equipes', (req,res) => {
    db.collection('equipe').find({}).toArray(function(err, docs) {
    if (err) {
              console.log(err)
              throw err
    }
   res.status(200).json(docs)
  })
})

//Search dans MongoDb
app.get('/equipes/:id', async (req,res) => {
    const id = parseInt(req.params.id)
    try {
        const docs = await db.collection('equipe').find({id}).toArray()
        res.status(200).json(docs)
    } 
    catch (err) {
      console.log(err)
      throw err
    }
})
    
//Ajout dans MongoDb
app.post('/equipes', async (req,res) => {
    try {
       const equipeData = req.body
       const equipe = await db.collection('equipe').insertOne(equipeData)
       res.status(200).json(equipe)
    } 
    catch (err) {
       console.log(err)
       throw err
    }
})
//Modifier dans MongoDb
app.put('/equipes/:id', async (req,res) => {
    try {
       const id = parseInt(req.params.id)
       const replacementEquipe = req.body
       const equipe = await db.collection('equipe').
                      replaceOne({id},replacementEquipe)
                      res.status(200).json(equipe)
    } catch (err) {
       console.log(err)
       throw err
      }
    })

//Supprimer dans MongoDb
app.delete('/equipes/:id', async (req,res) => {
    try {
        const id = parseInt(req.params.id)
        const equipe = await db.collection('equipe').deleteOne({id})
        res.status(200).json(equipe)
    } catch (err) {
       console.log(err)
        throw err
    }
    })
    
  */
