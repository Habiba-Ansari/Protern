const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function connectToDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db('Startupconnect'); // Replace with your database name
    } catch (err) {
        console.error('Could not connect to MongoDB...', err);
        process.exit(1);
    }
}

module.exports = connectToDB;