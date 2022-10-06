const mongo = require("mongodb")

const url = "mongodb://0.0.0.0:27017/firstdb"

const mongoClient = mongo.MongoClient

//connecting and creating the db
mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});

//connecting and creating collections
mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db("firstdb");
    dbo.createCollection("customers", (err, result) => {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});

//connecting and inserting a document
mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db("firstdb");
    const customer = { name: "Ade", address: "Lagos" };
    dbo.collection("customers").insertOne(customer, (err, result) => {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});

//connecting and inserting multiple documents
mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db("firstdb");
    const customers = [
        { name: 'John', address: 'Lagos' },
        { name: 'Peter', address: 'Ibadan' }
    ];
    dbo.collection("customers").insertMany(customers, (err, result) => {
        if (err) throw err;
        console.log("Number of documents inserted: " + result.insertedCount);
        db.close();
    });
});

//connecting and finding data in a collection
mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db("firstdb");
    dbo.collection("customers").findOne({}, (err, result) => {
        if (err) throw err;
        console.log(result.name);
        db.close();
    });
});

//connecting and finding multiple data
mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db("firstdb");
    dbo.collection("customers").find({}).toArray((err, result) => {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});

//connecting and finding specific data
mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db("firstdb");
    dbo.collection("customers").find({},
        { projection: { _id: 0, name: 1, address: 1 } }).toArray((err, res) => {
            if (err) throw err;
            console.log(res);
            db.close();
        });
});

//connecting and querying
mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db("firstdb");
    const query = { address: "Lagos" };
    dbo.collection("customers").find(query).toArray((err, res) => {
        if (err) throw err;
        console.log(res);
        db.close();
    });
});

//connecting and sorting in ascending order
mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db("firstdb");
    const mysort = { name: 1 };
    dbo.collection("customers").find().sort(mysort).toArray((err, result) => {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});

//connecting and sorting in descending order
mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db("firstdb");
    const mysort = { name: -1 };
    dbo.collection("customers").find().sort(mysort).toArray((err, result) => {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});

//connecting and deleting a document
mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db("firstdb");
    const myquery = { name: 'Ade' };
    dbo.collection("customers").deleteOne(myquery, (err, obj) => {
        if (err) throw err;
        console.log("1 document deleted");
        db.close();
    });
});

//connecting and deleting multiple documents
mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db("firstdb");
    const myquery = { address: /^O/ };
    dbo.collection("customers").deleteMany(myquery, (err, obj) => {
        if (err) throw err;
        console.log(obj.result.n + " document(s) deleted");
        db.close();
    });
});

//connecting and dropping a collection
mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db("firstdb");
    dbo.dropCollection("customers", (err, delOK) => {
        if (err) throw err;
        if (delOK) console.log("Collection deleted");
        db.close();
    });
});

//connecting and updating a document
mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db("firstdb");
    const myquery = { address: "Ibadan" };
    const newvalues = { $set: { name: "Joe", address: "Lagos" } };
    dbo.collection("customers").updateOne(myquery, newvalues, (err, res) => {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
    });
});

//connecting and uodating many documents
mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db("firstdb");
    const myquery = { address: /^J/ };
    const newvalues = { $set: { name: "Ola" } };
    dbo.collection("customers").updateMany(myquery, newvalues, (err, res) => {
        if (err) throw err;
        console.log(res.result.nModified + " document(s) updated");
        db.close();
    });
});