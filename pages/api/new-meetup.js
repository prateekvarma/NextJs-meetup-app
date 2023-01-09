import { MongoClient } from "mongodb";

// /api/new-meetup

async function handler(req, res) {
  if(req.method === 'POST') {
    const data = req.body;

    const { title, image, address, description } = data;
  
    const client = await MongoClient.connect('xxx-mongoUrl-xxx');
    const db = client.db();
    const meetupsCollection = db.collection('meetups'); //naming the collection
    const result = await meetupsCollection.insertOne({ title, image, address, description }); //could just use data
    console.log('Meetup created result: ', result);
    client.close();
    res.status(201).json({ message: 'Meetup Created!' })
  }
}

export default handler;