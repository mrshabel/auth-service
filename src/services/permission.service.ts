import { Permission } from "../models/permission.model";
import {
    AddOnePermissionInput,
    GetAllPermissionsInput,
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

export async function getAllPermissions(
    query: GetAllPermissionsInput["query"]
) {
    const { skip, limit, ...search } = query;

    // construct the search query
    const searchQuery = { ...search };

    // fetch records count and data
    const [total, data] = await Promise.all([
        Permission.countDocuments(searchQuery),
        Permission.find(searchQuery)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
    ]);
    return { total, data };
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
