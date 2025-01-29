import { connect } from 'mongoose';

const databaseName = "TheBookHeaven"

const connection = await connect(`mongodb://127.0.0.1:27017/${databaseName}`);

export default connection;