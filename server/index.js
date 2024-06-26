const express= require("express");
const app= express();
const db= require("./models/index");
const cors= require("cors");
const cookieParser= require("cookie-parser");
const user = require("./models/user");

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));
app.use(express.json());

app.use(cookieParser());

app.post("/addUser",async (req, res)=>{
  
    const {username, password}= req.body;
    const user= await db.User.create({username, password});
 
    res.cookie("user_id", user.id,{
        httpOnly:true,
        secure:false
    });
    res.send({user:user});
});

app.post("/createPost",async (req, res)=>{
    const user_id= req.cookies.user_id;
    const {title, desc}= req.body;

    const post=await db.Post.create({title, desc, user_id});
    res.send(post);
});

app.post("/addComment", async (req, res)=>{
    const {message, post_id}= req.body;
    const user_id= req.cookies.user_id;

    const comment= await db.Comment.create({message, post_id, user_id});
    res.send(comment);
});

app.post("/addReply", async (req, res)=>{
    const {message, parent_id, post_id}= req.body;
const user_id= req.cookies.user_id;
if(user_id){
    const r1= await db.Comment.findByPk(parent_id);
    const r2= await db.Comment.create({message,user_id, post_id});

    await r1.addReply(r2);
    res.send("reply added");}else{
        res.send("unvalid user");
    }

});

app.get("/getReplies", async (req, res)=>{
    const comment_id= req.headers.comment_id;
    const c1= await db.Comment.findByPk(comment_id);
    console.log(c1);
    const allReplies= await c1.getReplies1();
    res.send(allReplies);

})

  

app.listen(5002, ()=>console.log("listening to 5002"));