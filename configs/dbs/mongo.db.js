const mongoose = require('mongoose');
const {DB_URI}=process.env;

class MongoDb {
    constructor() {
        if (!MongoDb.instance){
            this.connect();
            MongoDb.instance = this;
        }

    }
    async connect() {
        try {
            await mongoose.connect(DB_URI);
            console.log('MongoDb Connected');
        }catch(err){
            console.error('MongoDb connection error:', err);
        }
    }
}
const instance = new MongoDb();
Object.freeze(instance);
module.exports = instance;
