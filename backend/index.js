const express= require("express");
const app= express();
const db= require("./models/index");
const cors= require("cors");
const cookieParser= require("cookie-parser");

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));
app.use(express.json());

app.use(cookieParser());

app.post("/addUser",async (req, res)=>{
  
    const {name, email, password, bio}= req.body;
    const user= await db.User.create({name, email,password, bio});
    console.log(user);
    res.cookie("user_id", user.id,{
        httpOnly:true,
        secure:false
    });
    res.send(user);
});

app.post("/createPost",async (req, res)=>{
    const user_id= req.cookies.user_id;
    const {file, name, desc}= req.body;

    const post=await db.Post.create({file, name, desc, user_id});
    res.send(post);
});

app.post("/addComment/:postId", async (req, res)=>{
    const user_id= req.cookies.user_id;
    const {message}= req.body;

    const comment= await db.Comment.create({message, user_id, post_id: req.params.postId});
    res.send(comment);
});

app.post("/addReply",async (req, res)=>{
    const user_id= req.cookies.user_id;
    const {parent_id,message}= req.body;

    const r1= await db.Comment.findByPk(parent_id);
    const r2= await db.Comment.create({user_id,message});

    await r1.addReply(r2);
    res.send("reply added");
} );

app.get("/allPosts", async (req, res)=>{
    const user_id= req.cookies.user_id;
    console.log(user_id);
    if(user_id){
        console.log("before");
    const posts= await db.Post.findAll({
        where:{
            user_id:user_id
        }
    });
    console.log("after");
    res.send({"posts": posts});
}else{
    res.send("user is not logged in");
}
})

app.listen(5002, ()=>console.log("listening to 5002"));