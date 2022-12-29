const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config();


// todo middleware's
app.use(cors());
app.use(express.json());

// todo mongodb

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qk4n58g.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// todo main function

async function run() {
    try {
        const taskCollections = client.db('tasksCollection').collection('tasks');
        const tasksCollection = client.db('tasksCollection').collection('myTasks');

        // todo get api
        app.get('/tasks', async (req, res) => {
            const query = {};
            const cursor = taskCollections.find(query);
            const tasks = await cursor.toArray();
            res.send(tasks);
        });
        // todo tasks api post collections

        // todo get post api data
        app.get('/myTasks', async (req, res) => {
            let query = {};
            if (req.query.email) {
                query: {
                    email: req.query.email
                }
            }
            const cursor = tasksCollection.find(query);
            const tasks = await cursor.toArray();
            res.send(tasks);
        });
        // todo get myTasks based on _id
        app.get('/myTasks/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const tasks = await tasksCollection.findOne(query);
            res.send(tasks);
        });

        // todo post api data
        app.post('/myTasks', async (req, res) => {
            const task = req.body;
            const result = await tasksCollection.insertOne(task);
            res.send(result);
        });

    }
    finally {

    }
}

run().catch(err => console.error(err));



// todo port
app.get('/', (req, res) => {
    res.send("Task server is running");
});
app.listen(port, () => {
    console.log("Task server is running on port: ", port);
});