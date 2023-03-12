// Task1: initiate app and run server at 3000

const express = require('express');
const app = express();
const path=require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

// Task2: create mongoDB connection 


const url = 'mongodb+srv://username:<password>@cluster0.bygqnjf.mongodb.net/testdb?retryWrites=true&w=majority';
const client = new MongoClient(url, { useNewUrlParser: true });

client.connect(err => {
  const collection = client.db("testdb").collection("merns");


// //Task 2 : write api with error handling and appropriate api mentioned in the TODO below


app.get('/api/employeelist', (req, res) => {
    collection.find({}).toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist/:id', (req, res) => {
    const id = req.params.id;
    collection.findOne({ _id: id }, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });
// TODO: Get a single employee from the database



//TODO: get single data from db  using api '/api/employeelist/:id'



//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist', (req, res) => {
    const employee = req.body;
    collection.insertOne(employee, (err, result) => {
      if (err) throw err;
      res.send('Employee added to database');
    });
  });



//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id', (req, res) => {
    const id = req.params.id;
    collection.deleteOne({ _id: id }, (err, result) => {
      if (err) throw err;
      res.send('Employee deleted from database');
    });
  });

//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist', (req, res) => {
    const employee = req.body;
    collection.updateOne({ _id: employee._id }, { $set: employee }, (err, result) => {
      if (err) throw err;
      res.send('Employee updated in database');
    });
  });


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



