import mongoose from "mongoose";

/**
 * create default permissions for the system to be used across all fresh application instances
 * mongodb IDs are consist of 24 hexadecimal characters so we start with 23 zero's and 1, then increment by 1 in our constant here
 */
export const SystemDefaultRoleBasedPermissions = Object.freeze({
    AppAdmin: {
        _id: new mongoose.Types.ObjectId("000000000000000000000001"),
        name: "AppAdmin",
        description: "The overall system administrator of the application",
        type: "ROLE",
    },
    Admin: {
        _id: new mongoose.Types.ObjectId("000000000000000000000002"),
        name: "Admin",
        description: "The administrator of the application",
        type: "ROLE",
    },
    User: {
        _id: new mongoose.Types.ObjectId("000000000000000000000003"),
        name: "User",
        description: "A user of the application",
        type: "ROLE",
    },
});
