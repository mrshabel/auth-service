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
