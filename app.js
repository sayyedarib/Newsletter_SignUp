const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

mailchimp.setConfig({
    apiKey: "0b47c611e5d5b599a544b4f55946cd70-us21",
    server: "us21"
});

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res){

// const listId = "4230e07c42";
// const subscribingUser = {
//     firstName:req.body.firstName,
//     lastName:req.body.lastName,
//     email:req.body.email
// }

// async function run(){
//     const response = await mailchimp.lists.addListMember(listId, {
//         email_address: subscribingUser.email,
//         status: "subscribed",
//         merge_fields: {
//           FNAME: subscribingUser.firstName,
//           LNAME: subscribingUser.lastName
//         }
//       });
 
//       console.log(
//         `Successfully added contact as an audience member. The contact's id is ${response.id}.`
//       );
//   }
 
//   run();

 const firstName = req.body.firstName;
 const lastName = req.body.lastName;
 const email = req.body.email;
 const data = {
       
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
        }



var jsonData = JSON.stringify(data);
const url = "https://us21.api.mailchimp.com/3.0/lists/4230e07c42/members";
const options = {
    method:"POST",
    auth:"Aarib:0b47c611e5d5b599a544b4f55946cd70-us21" //any username then api key

}

const request=  https.request(url,options,function(response){
console.log(response.statusCode);
    if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }
response.on("data",function(data){
console.log(JSON.parse(data));
})
})

request.write(jsonData);
request.end();


});

app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT,function(){
console.log("Server is running on port 3000")
}
);
//api key
//0b47c611e5d5b599a544b4f55946cd70-us21  //X=21 in url afterus

//list or audience id
//4230e07c42