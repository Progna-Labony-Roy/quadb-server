const express = require('express');
const app= express();
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion, Collection, ObjectId } = require('mongodb');

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://blog-website:tI7OV8i3oqyXKmx7@cluster0.vba6qse.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const movieCollection = client.db('movieDatabase').collection("movies");

        app.get('/movies', async(req, res) =>{
            const query= {};
            const cursor= movieCollection.find(query)
            const movie= await cursor.toArray();
            res.send(movie);
        })


        app.get('/movies/:id', async(req,res) =>{
            id=req.params.id;
            const query ={_id: ObjectId(id)};
            const movie= await movieCollection.findOne(query);
            res.send(movie)
        })

    }
    
    finally{

    }
}
run().catch(err => console.error(err));


app.get('/',(req , res)=>{
    res.send("Server is running")
})

app.listen(port ,() =>{
    console.log(`Server running on ${port}`)
})