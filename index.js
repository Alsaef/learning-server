const express = require('express')
const cors= require('cors');
const app = express()
const port = 3000 || process.env.PORT
app.use(express.json())
app.use(cors())
require('dotenv').config()



// mongodb connection



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB}:${process.env.password}@cluster0.hwuf8vx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection



    const bataBase= client.db('EnglishDB')

    const vocabularys= bataBase.collection('vocabularys')
    const days= bataBase.collection('days')
    const level= bataBase.collection('level')


// upload vocabulary database
    app.post('/api/v1/vocabularysall',async(req,res)=>{
       const uploadVocabularys=req.body;

      const result=await vocabularys.insertMany(uploadVocabularys)
   
      res.json(result)
    })



 // find and query day and level vocabulary data 
    app.get('/api/v1/vocabulary',async(req,res)=>{
      const level = parseInt(req.query.level, 10);
      const day = parseInt(req.query.day, 10);
  
      if (isNaN(level) || isNaN(day)) {
        return res.status(400).json({ error: "Invalid level or day parameter" });
      }
      const result=await vocabularys.find({ level: level, day: day }).toArray()

      res.json(result)
    })


    // find single vocabulary data 
    app.get('/api/v1/vocabulary/:id',async(req,res)=>{
      const id=req.params.id
      const result=await vocabularys.findOne({_id:new ObjectId(id)})

      res.json(result)
    })









    // upload level api data base
    app.post('/api/v1/level',async(req,res)=>{
       const levels=req.body;

      const result=await level.insertMany(levels)
   
      res.json(result)
    })

    // find level data
    app.get('/api/v1/level',async(req,res)=>{
      const result=await level.find().toArray()
      
      res.json(result)
    })



    // upload day  data base
    app.post('/api/v1/days',async(req,res)=>{
       const day=req.body;

      const result=await days.insertMany(day)
   
      res.json(result)
    })

    

// find day data
    app.get('/api/v1/day',async(req,res)=>{
      const result=await days.find().toArray()
      
      res.json(result)
    })













    // dialogue



// app.post()


// app.get()



// app.get()







    // paragraph



    
// app.post()


// app.get()



// app.get()




    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);













app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  
})


// GET http://localhost:3000/api/v1/vocabulary?level=1&day=1