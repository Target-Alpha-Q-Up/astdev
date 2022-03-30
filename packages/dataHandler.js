const { MongoClient } = require("mongodb");
const { uri } = require("../config.json");

const client = new MongoClient(uri);

class DataClient {
    constructor(database) {
        this.database = database;
    };

    getStamp() {
        var dateObject = new Date();
        let day = ("0" + dateObject.getDate()).slice(-2);
        let month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
        let year = dateObject.getFullYear();
        let hours = dateObject.getHours();
        let minutes = dateObject.getMinutes();
        let seconds = dateObject.getSeconds();
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    async fetch_one(coll, query) {
        var result;
        try {
            await client.connect();

            const db = client.db(this.database);

            result = await db.collection(coll).findOne(query);
        } finally {
            await client.close();
        };
        if (result !== null) return true;
        return false;
    };

    async find_one(coll, query) {
        var result;
        try {
            await client.connect();

            const db = client.db(this.database);

            result = await db.collection(coll).findOne(query);

            console.log(`${this.getStamp()} - 1 document found by query`);
        } finally {
            await client.close();
        };
        return result;
    };

    async find_many(coll, query) {
        var result;
        try {
            await client.connect();

            const db = client.db(this.database);

            const cursor = await db.collection(coll).find(query);

            result = await cursor.toArray();

            console.log(`${this.getStamp()} - ${await result.length} document(s) found by query`);
        } finally {
            await client.close();
        };
        return result;
    };

    async insert_one(coll, document) {
        try {
            await client.connect();

            const db = client.db(this.database);

            await db.collection(coll).insertOne(document);

            console.log(`${this.getStamp()} - 1 document inserted to ${this.database}.${coll}`);
        } finally {
            await client.close();
        };
    };

    async insert_many(coll, documents) {
        try {
            await client.connect();

            const db = client.db(this.database);

            const result = await db.collection(coll).insertMany(documents);

            console.log(`${this.getStamp()} - ${result.insertedCount} document(s) inserted to ${this.database}.${coll}`);
        } finally {
            await client.close();
        };
    };

    async update_one(coll, filter, updatedDoc) {
        try {
            await client.connect();

            const db = client.db(this.database);

            const result = await db.collection(coll).updateOne(filter, updatedDoc);

            console.log(`${this.getStamp()} - 1 document matched and updated to ${this.database}.${coll}`);
        } finally {
            await client.close();
        };
    };

    async update_many(coll, filter, updatedDoc) {
        try {
            await client.connect();

            const db = client.db(this.database);

            const result = await db.collection(coll).updateMany(filter, updatedDoc);

            console.log(`${this.getStamp()} - ${result.modifiedCount} document(s) matched and updated to ${this.database}.${coll}`);
        } finally {
            await client.close();
        };
    };

    async delete_one(coll, filter) {
        try {
            await client.connect();

            const db = client.db(this.database);

            const result = await db.collection(coll).deleteOne(filter);

            console.log(`${this.getStamp()} - 1 document deleted from ${this.database}.${coll}`);
        } finally {
            await client.close();
        };
    };

    async delete_many(coll, filter) {
        try {
            await client.connect();

            const db = client.db(this.database);

            const result = await db.collection(coll).deleteMany(filter);

            console.log(`${this.getStamp()} - ${result.deletedCount} document(s) deleted from ${this.database}.${coll}`);
        } finally {
            await client.close();
        };
    };

    async replace_one(coll, filter, replacement) {
        try {
            await client.connect();

            const db = client.db(this.database);

            const result = await db.collection(coll).replaceOne(filter, replacement);

            console.log(`${this.getStamp()} - 1 document replaced in ${this.database}.${coll}`);
        } finally {
            await client.close();
        };
    };
}

module.exports = DataClient;

// EXAMPLES

// DATACLIENT EXAMPLE
// let dataClient = new DataClient("database");

// FIND ONE EXAMPLE
// dataClient.find_one("collection", {}).then(results => {
//     return;
// });

// FIND MANY EXAMPLE
// dataClient.find_many("collection", {}).then(results => {
//     return;
// });

// INSERT ONE EXAMPLE
// dataClient.insert_one("collection", {});

// INSERT MANY EXAMPLE
// dataClient.insert_many("collection", []);

// UPDATE ONE EXAMPLE
// dataClient.update_one("collection", {}, { $set: {} });

// UPDATE MANY EXAMPLE
// dataClient.update_many("collection", {}, { $set: {} });

// DELETE ONE EXAMPLE
// dataClient.delete_one("collection", {});

// DELETE MANY EXAMPLE
// dataClient.delete_many("collection", {});

// REPLACE ONE EXAMPLE
// dataClient.replace_one("collection", {}, {});

