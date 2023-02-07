const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ntptfwh.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const courseCollection = client.db('eduMart').collection('courses');


        // app.get('/courses',async(req,res)=>{
        //     res.send('hi')
        // })

        app.get('/courses', async (req, res) => {
            const query = {}
            const cursor = courseCollection.find(query);
            const courses = await cursor.toArray();
            res.send(courses);
        });

        app.get('/courses/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const course= await courseCollection.findOne(query);
            res.send(course);
        });
    }
    finally {

    }
}

run().catch(err => console.error(err));



app.get('/', (req, res) => {
    res.send('edu courses mart server is running')
})

app.listen(port, () => {
    console.log(`edu courses mart is running on port ${port}`);
})