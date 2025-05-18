const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const app = express();

app.use(express.json());

app.post('/todo',async function(req,res){
   const createPayload = req.body;
   const parsePayload = createTodo.safeParse(createPayload);
   if(!parsePayload.success){
    res.status(411).json({
        msg : "You sent a wrong inputs"
    })
    return;
   }

   await todo.create({
    title : createPayload.title,
    description : createPayload.description,
    completed : false
   })
   res.json({
    msg : "Todo Created"
   })
})

app.get('/todo',async function(req,res){
    const todos = await todo.find({});
    console.log(todos);
    res.json({
        todos
    })
})

app.put('/completed',async function(req,res){
   const updateCreatePayload = req.body;
   const parsePayload = updateTodo.safeParse(updateCreatePayload);
   if(!parsePayload.success){
    res.status(411).json({
        msg : "You sent a wrong inputs"
    })
    return;
   }

   await todo.update({
    _id : req.body.id,
   },
    {
        completed : true
    })
    res.json({
        msg : "Todo Marked as Completed"
    })
})
app.listen(3000,() => {
    console.log("Listening on 3000");
    
})