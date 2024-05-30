
const Datastore = require('nedb');
const db = new Datastore('users.db');
db.loadDatabase();

const p = new Datastore('post.db');
p.loadDatabase();

const express = require('express');
const app = express();

app.listen(3000, () => console.log('listening at 3000')); // to run it localy
app.use(express.static('public')); // the file you want to run
app.use(express.json({ limit : '1mb' }));

app.post('/api', (request, response) => {
    let body = request.body;
    db.insert(body);
    response.json({
        status: "success",
    });
});

app.post('/post1', (request, response) => {
    let body = request.body;
    p.insert(body);
    response.json({
        status: "success",
    });
});

app.get('/api', (request, response) => {
    db.find({}, (err, data) => {
        if(err){
            response.end();
            console.log(err);
            return;
        }
        response.json(data);
    });
});

app.get('/getData', (request, response) => {
    p.find({}, (err, data) => {
        if(err){
            response.end();
            console.log(err);
            return;
        }
        response.json(data);
    });
});

app.get('/check', (request, response) => {
    db.find({}, (err, data) => {
        if(err){
            response.end();
            console.log(err);
            return;
        }
        response.json(data);
    });
});