import { Permission } from "../models/permission.model";
import {
    AddOnePermissionInput,
    UpdateOnePermissionByIdInput,
} from "../schemas/permission.schema";

// create
export async function addOnePermission(data: AddOnePermissionInput["body"]) {
    return await Permission.create(data);
}

// read
export async function getOnePermissionById(id: string) {
    return await Permission.findById(id);
}

export async function getAllPermissions() {
    return Permission.find();
}

// update
export async function updateOnePermissionById(
    id: string,
    data: UpdateOnePermissionByIdInput["body"]
) {
    return await Permission.findByIdAndUpdate(id, data, { new: true });
}

// delete
export async function deleteOnePermissionById(id: string) {
    return await Permission.findByIdAndDelete(id);
}
