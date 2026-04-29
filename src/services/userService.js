import {findAllUsers, findUserById, updateUser, deleteUser} from "../repositories/userRepo.js";

export async function getAllUsers()
{
    const allUsers = await findAllUsers();
    return allUsers;
}

function thereOrNot(id, user)
{
    if (user)
    {
        return user;
    }
    else
    {
        const error = new Error(`User ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function getUserById(id)
{
    const user = await findUserById(id);
    return thereOrNot(id, user);
}

export async function updateUserById(id, data)
{
    const updatedUser = await updateUser(id, data);
    return thereOrNot(id, updatedUser);
}

export async function deleteUserById(id)
{
    const deleteUser = await deleteUser(id);
    if(deleteUser)
    {
        return;
    }
    else
    {
        const err = new Error(`User ${id} not found`);
        err.status = 404;
        throw err;
    }
}