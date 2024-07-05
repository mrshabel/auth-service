// mongodb initialization script

// the `db` value below is injected into the mongodb database context when the script is run in the mongodb shell

// the current db specified in the docker compose INIT_DB will be currently used while you can still switch with `db = db.getSiblingDB("database")`
// reference: https://hub.docker.com/_/mongo

// Create a user with read and write role for the 'auth-service' database
db.createUser({
    user: process.env.MONGO_INITDB_ROOT_USERNAME,
    pwd: process.env.MONGO_INITDB_ROOT_PASSWORD,
    roles: [{ role: "readWrite", db: "auth-service" }],
});

// insert default data

// add system permissions
db.createCollection("permissions");

db.collection("permissions").insertMany([
    {
        _id: new mongoose.Types.ObjectId("000000000000000000000001"),
        name: "AppAdmin",
        description: "The overall system administrator of the application",
        type: "ROLE",
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0,
    },
    {
        _id: new mongoose.Types.ObjectId("000000000000000000000002"),
        name: "Admin",
        description: "The administrator of the application",
        type: "ROLE",
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0,
    },
    {
        _id: new mongoose.Types.ObjectId("000000000000000000000003"),
        name: "User",
        description: "A user of the application",
        type: "ROLE",
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0,
    },
]);
