var express = require("express")
var path = require("path")

var app = express();

function handleParams(params, callback){
    //first remove the "/" that comes with all the paths
    params = params.toString().replace("/", "");
    //create a new date object
    Date.prototype.getMonthText = function(){
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[this.getMonth()]
    }
    var date = new Date(params);
    if(isNaN(date.valueOf())){
        //the user passed in the wrong date
        console.log("in if")
        callback({"unix" : null, "natural": null});
    }else{
        console.log("in else")
        callback({"unix": date.valueOf(), "natural": date.getMonthText() + " " + date.getDate() + ", " + date.getFullYear()});
    }
}
app.get("*", function(req,res){
    handleParams(req.params, function(arg){
        res.end(JSON.stringify(arg));
    })
});

app.listen(8080);