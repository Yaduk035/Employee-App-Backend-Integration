// Task 1: initiate app and run server at 3000
const Express = require("express")
const BodyParser = require("body-parser")
const Cors = require("cors")
const {employeeModel} = require("./model/Employee")
const Mongoose = require("mongoose")

const app = Express()

app.use(Cors())
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({extended : true}))

const path=require('path');
app.use(Express.static(path.join(__dirname+'/dist/FrontEnd')));

// Task 2: create mongoDB connection
Mongoose.connect("mongodb+srv://yaduk035:Metalhead3063.@cluster0.bygqnjf.mongodb.net/db1?retryWrites=true&w=majority", {useNewUrlParser: true})


//Task 3 : write api with error handling and appropriate api mentioned in the TODO below
//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist', async (req, res) => {
    var data = await employeeModel.find()
    res.json(data)
})

//TODO: get single data from db  using api '/api/employeelist/:id'
app.get('/api/employeelist/:id', async (req, res) => {
   const id = req.params.id
   var data = await employeeModel.findById(id)
   res.json(data)
})

//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post('/api/employeelist', async (req, res) => {
    var data = new employeeModel(req.body)
    data.save()
    res.redirect('/api/employeelist')
})

//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('/api/employeelist/:id', async (req, res) => {
    const id = req.params.id
    var data = await employeeModel.findByIdAndDelete(id)
    res.json(data)
 })

//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist/', async (req, res) => {
    await employeeModel.findOneAndUpdate({"_id": req.body._id}, req.body)
    res.json({status: "Success"})
})


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

app.listen(3000, () => {
    console.log('Server Started')
})



