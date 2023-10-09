var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb+srv://dhruviladani:dhruviladani@studentsdb.vkduu1o.mongodb.net/StudentsDB?retryWrites=true&w=majority&appName=AtlasApp',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    var studentId = req.body.studentId;
    var semester = req.body.semester;
    var companyName = req.body.companyName;
    var companyAddress = req.body.companyAddress;
    var hrDetails = req.body.hrDetails;
    var hrContact = req.body.hrContact;
    var duration = req.body.duration;
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    var requiredNOC = req.body.requiredNOC;

    var data = {
        "studentId": studentId,
        "semester" : semester,
        "companyName" : companyName,
        "companyAddress": companyAddress,
        "hrDetails": hrDetails,
        "hrContact": hrContact,
        "duration": duration,
        "startDate": startDate,
        "endDate": endDate,
        "requiredNOC": requiredNOC,
    }

    db.collection('datas').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('dashboard.html')

})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('conformation.html');
}).listen(3000);


console.log("Listening on PORT 3000");
