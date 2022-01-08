// const express = require('express');
// const exec = require('child_process').exec;
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const fs = require('fs');
// const app = express();


// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());
// app.use(cors());


// app.post('/' , function(req, res){
    

//     fs.writeFile('./c++/test.cpp' , req.body.code ,  function(err){
//         if(err) {
//             console.log(err)
//             return;
//         }
//         console.log('saved');
//     });

//     exec('g++ ./c++/test.cpp -o ./c++/a' , function(err, stdout, stderr){
//         if(err) {
//             console.log(err)
//             return;
//         }
//         if(stderr) console.log(stderr);

//         exec('./c++/a' , function(err, stdout , stderr){
//             if(err) {
//                 console.log(err)
//                 return;
//             }
//             if(stdout) res.json({result: stdout});
//         })
//     })
    
    
// });

// app.listen('4000', (err)=>{
//     console.log('server is up and running');
// })

const express = require('express');
const { exec , spawn } = require('child_process');
const cors = require('cors');
const fs = require('fs');


const app = express();

var code = {
    code: `#include<iostream>\n using namespace std; \n int main(){ \n int a,b; cin>>a>>b; cout<<a+b;}`
}
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}))


const runCode = async (req, res) =>{

    let code = req.body.code;
    let input = req.body.input;

    console.log(input)
    fs.writeFile('hello.cpp' ,code,  function(err){
        if(err) {
            console.log(err)
            return;
        }
        console.log('saved');
    });

    exec('g++ hello.cpp' , (error , stderr , stdout) =>{
        if(error){
            console.log(`err : ${error}`);
            return;
        }

        if(stderr){
            console.log(`stderr: ${stderr}`);
            return;
        }

        var child = spawn('./a.out');
        child.on('error' , (err)=>{
        console.log(err)
         });
        child.stdin.write(input);
        child.stdin.end();
        child.stdout.setEncoding('utf-8');
        child.stdout.on('data' , (data)=> console.log(data));
        child.stderr.on('data' , (data)=> console.log(data));
    });
}


app.post('/' , runCode);
app.listen('4000', ()=>{ console.log('listeninggggg')});