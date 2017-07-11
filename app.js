/*
* @Author: 夏本增
* @Date:   2017-05-19 14:51:34
* @Last Modified time: 2017-05-19 16:31:44
*/

var express = require('express');
var app = express();

app.use(express.static('public'));

/*app.get('/',function(req,res){
	res.send('第一个express')
});
*/
app.listen(7777,function(){
	console.log('run 127.0.0.1:7777');
})