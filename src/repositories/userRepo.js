import prisma from "../config/db.js";

export async function createUser(data)
{
    try
    {
        const newUser = await prisma.user.create({data: data, omit: {password: true}});
        return newUser;
    }
    catch(error)
    {
        if(error.code === "P2002")
        {
            const err = new Error("Email has already been taken by another user");
            err.status = 409;
            throw err;
        }
        throw error;
    }
}

export async function findUserByEmail(email)
{
    return prisma.user.findUnique({where: {email}});
}

export async function findAllUsers()
{
    return prisma.user.findMany({omit: {password: true}});
}

export async function findUserById(id)
{
    return prisma.user.findUnique({where: {id}, omit: {password: true}});
}

export async function updateUser(id, data)
{
    try
    {
        const updatedUser = prisma.user.update({where: {id: id}, data: data, omit: {password: true}});
        return updatedUser;
    }
    catch(error)
    {
        if(error.code === "P2025")
        {
            return null;
        }
        else if(error.code === "P2002")
        {
            const err = new Error("Email has already been taken.");
            err.status = 409;
            throw err;
        }
        throw error;
    }
}

export async function deleteUser(id)
{
    try
    {
        const deletedUser = prisma.user.delete({where: id});
        return deletedUser;
    }
    catch(error)
    {
        if(error.code === "P2025")
        {
            return null;
        }
        throw error;
    }

}