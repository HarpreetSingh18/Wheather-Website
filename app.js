const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");


app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res)
{


     res.sendFile(__dirname+"/index.html")
	
});


app.post("/",function(req,res)
{
	const cityName=req.body.cityName;
    var url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=b1ae1b1f13442b29394e20dc56c5824f&units=metric";
    https.get(url,function(response)
    	{
    		console.log(response.statusCode);

    		response.on("data",function(data)
    		{
               
               var wData=JSON.parse(data);
               console.log(wData.main.temp);
               const icon=wData.weather[0].icon;
               const iconURL="http://openweathermap.org/img/wn/"+ icon +"@2x.png";
               res.write("<p>The weather is currently "+wData.weather[0].description);
               res.write("<h1>The weather of "+ cityName+" is " +wData.main.temp+" degree celsius</h1>");
               res.write("<img src=" +iconURL+ ">");
               res.send();
    		});
    	});

});

app.listen(3000,function()
{
	console.log("Server is runnning on port 3000.");
});