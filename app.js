var express     =    require('express'),
    app         =    express(),
    request     =    require('request'),
    fs          =    require('fs');
const basicAuth = require('express-basic-auth');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

var https = require('https');

var host = 'scheduler.api.appdynamics.com';

async function update( arquivo ) {
  const { stdout, stderr } = await exec('curl --silent -H "Authorization: Basic QmFuY29CcmFkZXNjb1NBLWEwUTM0MDAwMDBFcXRCRUVBWjo0ZmIxY2RiYS0zZmE2LTQyOTktOGViMi0yYWM3ZTI4ZjJmNDI=" https://scheduler.api.appdynamics.com/v1/schedule/93b6810e-d07d-4b26-addc-050278942af5  -H "Content-Type: application/json" -X PUT -d@' + arquivo);
}

async function processarJob( job, res ) {
  performRequest('/v1/schedule/' + job, 'GET', {}, function(data) {
    data.userEnabled = false;
    var arquivo = new Date().getTime() + '.txt';
    var dataString = JSON.stringify(data);
    fs.writeFile(arquivo, dataString, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
    update();
    console.log(new Date());
    sleep(3000);
    console.log(new Date());
    data.userEnabled = true;
    var dataString = JSON.stringify(data);
    fs.writeFile(arquivo, dataString, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
    update();
    res.send('Teste realizado com sucesso!');
    sleep(3000); 
    fs.unlinkSync(arquivo);
    // res.sendfile("index.html");
  });
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    console.log(new Date().getTime());
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function performRequest(endpoint, method, data, success) {
  var dataString = JSON.stringify(data);
  var headers = {};
  
    headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Basic QmFuY29CcmFkZXNjb1NBLWEwUTM0MDAwMDBFcXRCRUVBWjo0ZmIxY2RiYS0zZmE2LTQyOTktOGViMi0yYWM3ZTI4ZjJmNDI='
    };
  var options = {
    host: host,
    path: endpoint,
    method: method,
    headers: headers
  };

  var req = https.request(options, function(res) {
    res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
      var responseObject = JSON.parse(responseString);
      success(responseObject);
    });
  });

  req.write(dataString);
  req.end();
}

app.get('/homebradescopj',function(req,res){
  res.sendfile("homebradescopj.html");
});

app.post('/acaohomebradescopj',
  function( req, res ){
    processarJob('bda94329-b3b3-46d2-b5de-dade5dc9bb55', res);
});

app.get('/pjloginlogout',function(req,res){
  res.sendfile("pjloginlogout.html");
});

app.post('/acaopjloginlogout',
  function( req, res ){
    processarJob('ac1efbeb-b00a-4a7d-b2b5-d31a1e95f522', res);
});

app.get('/pjprocuradorextrato',function(req,res){
  res.sendfile("pjprocuradorextrato.html");
});

app.post('/acaopjprocuradorextrato',
  function( req, res ){
    processarJob('ac1efbeb-b00a-4a7d-b2b5-d31a1e95f522', res);
});

app.get('/pjprocuradorpagamentos',function(req,res){
  res.sendfile("pjprocuradorpagamentos.html");
});

app.post('/acaopjprocuradorpagamentos',
  function( req, res ){
    processarJob('c55ce673-0367-4b2f-97ec-a80c411a208a', res);
});

app.get('/pjverificaaprovacao',function(req,res){
  res.sendfile("pjverificaaprovacao.html");
});

app.post('/acaopjverificaaprovacao',
  function( req, res ){
    processarJob('93b6810e-d07d-4b26-addc-050278942af5', res);
});

app.get('/pjcashmanagement',function(req,res){
  res.sendfile("pjcashmanagement.html");
});

app.post('/acaopjcashmanagement',
  function( req, res ){
    processarJob('29ccb0a0-617d-4901-9c9a-714f2d3afe38', res);
});

app.get('/pjprocuradortitulos',function(req,res){
  res.sendfile("pjprocuradortitulos.html");
});

app.post('/acaopjprocuradortitulos',
  function( req, res ){
    processarJob('ff8f6be6-14ec-4788-b385-3110bb5fab60', res);
});

app.get('/pjmasteratualizacontas',function(req,res){
  res.sendfile("pjmasteratualizacontas.html");
});

app.post('/acaopjmasteratualizacontas',
  function( req, res ){
    processarJob('ec5420f8-6a4f-4d4d-8a54-e3377e738d5a', res);
});

app.get('/pjmasterpermissaoconta',function(req,res){
  res.sendfile("pjmasterpermissaoconta.html");
});

app.post('/acaopjmasterpermissaoconta',
  function( req, res ){
    processarJob('deba6b59-e8f7-4764-b30e-07d80646ed64', res);
});

app.get('/pjmasterprocuradorn2',function(req,res){
  res.sendfile("pjmasterprocuradorn2.html");
});

app.post('/acaopjmasterprocuradorn2',
  function( req, res ){
    processarJob('86038b13-ea15-46b1-bc59-45f1ba906297', res);
});

app.get('/pjmasterprocuradorn3',function(req,res){
  res.sendfile("pjmasterprocuradorn3.html");
});

app.post('/acaopjmasterprocuradorn3',
  function( req, res ){
    processarJob('fb56dac0-c2a8-4282-8722-c8080599fe3a', res);
});

app.use(basicAuth({
  users: { 'admin': 'admin' },
  challenge: true,
  realm: 'Imb4T3st4pp',
}))

app.listen(8080,function(){
    console.log("Working on port 8080");
});
