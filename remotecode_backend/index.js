const express = require('express');
const exec = require('child_process').exec;
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());


app.post('/' , function(req, res){
    

    fs.writeFile('./c++/test.cpp' , req.body.code ,  function(err){
        if(err) {
            console.log(err)
            return;
        }
        console.log('saved');
    });

    exec('g++ ./c++/test.cpp -o a' , function(err, stdout, stderr){
        if(err) {
            console.log(err)
            return;
        }
        if(stderr) console.log(stderr);

        exec('./a' , function(err, stdout , stderr){
            if(err) {
                console.log(err)
                return;
            }
            if(stdout) res.json({result: stdout});
        })
    })
    
    
});

app.listen('4000', (err)=>{
    console.log('server is up and running');
})