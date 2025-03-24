const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('Startupconnect');
    const collection = db.collection('internships');

    // Reverse the flattening by reintroducing embedded fields and removing root-level fields
    const result = await collection.updateMany(
      {},  // Target all documents
      [
        {
          $set: {
            // Recreate the embedded location object using city and state fields
            location: {
              city: "$city",
              state: "$state"
            },
            // Recreate the embedded stipend object using stipend_min and stipend_max fields
            stipend: {
              min: "$stipend_min",
              max: "$stipend_max"
            }
          }
        },
        {
          // Remove the root-level fields (city, state, stipend_min, stipend_max)
          $unset: ["city", "state", "stipend_min", "stipend_max"]
        }
      ]
    );

    console.log(`Reversed changes for ${result.modifiedCount} documents`);

  } catch (err) {
    console.error('Error occurred:', err.message);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

main().catch(console.error);
