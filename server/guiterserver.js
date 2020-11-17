var fs = require('fs');
var express = require('express');
var multer  = require('multer')

var app = express();
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });
var upload = multer({ dest: 'imgs/' });
var data = [{a:'a'}];
function doGet(request, response){
    fs.readFile('guiterdata.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        response.end(data);
    });
}
app.post('/', upload.single('file'), function(req, res, next){
    console.log(req.body.id,req.file.filename);
    var data = [];
    fs.readFile('guiterdata.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        data = JSON.parse(data.toString());
        var foc = null;
        for(var i=0;i<data.length;i++){
            if(data[i].id == req.body.id){
                foc = data[i];
            }
        }
        if(!foc){
            data.push({
                id:req.body.id,
                imgs:[req.file.filename],
                name:req.body.name
            })
        }else{
            foc.imgs.push(req.file.filename);
        }
        fs.writeFile('guiterdata.json', JSON.stringify(data), function (error) {
            if (error) {
              console.log(error)
            }
            res.send({filename: req.file.filename});
        })
     });
});

app.get('/', function(req, res){
    fs.readFile('guiterdata.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        res.end(data);
     });
});

app.delete('/', function(req, res){
    fs.readFile('guiterdata.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        data = JSON.parse(data.toString());
        var target = null;
        for(var i=0;i<data.length;i++){
            if(data[i].id == req.query.id){
                target = data[i];
            }
        }
        if(!target){
            res.send({status:'suc'});
            return;
        }
        for(var i=0;i<target.imgs.length;i++){
            fs.unlink(__dirname + "/imgs/" + target.imgs[i],function(error){
                if(error){
                    console.log(error);
                    return false;
                }
                console.log('删除文件成功');
            })                        
        }
        data.splice(data.indexOf(target),1);
        fs.writeFile('guiterdata.json', JSON.stringify(data), function (error) {
            if (error) {
                console.log(error)
            }
            res.send({status:'suc'});
        })
     });
});

app.get('/img', function(req, res){
    console.log(req.query.name);
    res.sendFile(__dirname + "/imgs/" + req.query.name);
});
app.delete('/img', function(req, res){
    fs.readFile('guiterdata.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        data = JSON.parse(data.toString());
        for(var i=0;i<data.length;i++){
            if(data[i].id == req.query.id){
                data[i].imgs.splice(data[i].imgs.indexOf(req.query.name),1);
            }
        }
        fs.unlink(__dirname + "/imgs/" + req.query.name,function(error){
            if(error){
                console.log(error);
                return false;
            }
            console.log('删除文件成功');
        }) 
        fs.writeFile('guiterdata.json', JSON.stringify(data), function (error) {
            if (error) {
                console.log(error)
            }
            res.send({status:'suc'});
        })
    });
});

app.listen(8888);