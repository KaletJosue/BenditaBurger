import { MongoClient } from "mongodb";
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

async function conectarConMongoDB() {
    try {
        await client.connect()
        return client.db(process.env.MONGODB_DBNAME);
    } catch (error) {
        throw error;
    }
}

export default conectarConMongoDB