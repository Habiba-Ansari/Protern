const { MongoClient } = require('mongodb');
const mongoose=require('mongoose');
// Replace with your MongoDB connection string
const uri = 'mongodb://localhost:27017/Startupconnect';
const client = new MongoClient(uri); // Removed deprecated options

async function connectToDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db();
    } catch (error) {
        console.error('Could not connect to MongoDB...', error);
        throw error;
    }
}

async function removeUniqueIndex() {
    try {
        const db = await connectToDB();
        const usersCollection = db.collection('users');

        // List all indexes to find the unique index name
        const indexes = await usersCollection.indexes();
        console.log('Existing indexes:', indexes);

        // Find the index name for the unique index on the username field
        const uniqueIndex = indexes.find(index => index.key.username);

        if (uniqueIndex && uniqueIndex.unique) {
            await usersCollection.dropIndex(uniqueIndex.name);
            console.log('Dropped unique index on username field');
        } else {
            console.log('No unique index found on username field');
        }
    } catch (error) {
        console.error('Error removing unique index:', error);
    }
}

async function createNonUniqueIndex() {
    try {
        const db = await connectToDB();
        const usersCollection = db.collection('users');

        await usersCollection.createIndex({ username: 1 }, { unique: false });
        console.log('Created non-unique index on username field');
    } catch (error) {
        console.error('Error creating non-unique index:', error);
    }
}

async function main() {
    // Define the schema for startups
    const db = await connectToDB();
const startupSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure the email is unique
    },
    password: {
        type: String,
        required: true
    }
});

// Create the model for startups
const Startup = mongoose.model('Startup', startupSchema);

// Create a new startup instance
const newUser = new Startup({
    fullName: startupFullName,
    email: startupEmail,
    password: startupPassword
});

// Save the new user to the database
newUser.save()
    .then(() => console.log('Startup created successfully'))
    .catch(err => console.error('Error creating startup:', err));
}

main();
