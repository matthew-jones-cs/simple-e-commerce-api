import {getAllUsers, getUserById, updateUserById, deleteUserById} from "../services/userService.js";
import bcrypt from "bcrypt";

export async function getAllUsersHandler(req, res)
{
    const users = await getAllUsers();
    res.status(200).json(users);
}

export async function getUserByIdHandler(req, res)
{
    const id = req.user.id;
    const user = await getUserById(id);
    res.status(200).json(user);
}

export async function updateUserByIdHandler(req, res)
{
    const data = {};
    const id = req.user.id;
    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;
    const password = req.body.password;
    const role = req.body.role;
    if(name)
    {
        data.name = name;
    }
    if(email)
    {
        data.email = email;
    }
    if(address)
    {
        data.address = address;
    }
    if(password)
    {
        data.password = bcrypt.hash(password, 10);
    }
    if(role)
    {
        if(req.user.role === "ADMIN")
        {
            data.role = role;
            id = req.body.id;
        }
        else
        {
            if(role !== "ADMIN")
            {
                data.role = role;
            }
        }
    }
    const updatedUser = await updateUserById(id, data);
    res.status(200).json(updatedUser);
}

export async function deleteUserByIdHandler(req, res)
{
    const id = req.user.id;
    await deleteUserById(id);
    res.status(204).send();
}

/*
export async function getOrdersOfUserByIdHandler(req, res)
{

}*/