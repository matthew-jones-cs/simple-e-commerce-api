import prisma from "../config/db.js";

export async function createItem(data)
{
    try
    {
        const newItem = await prisma.item.create({data: data});
        return newItem;
    }
    catch(error)
    {
        throw error;
    }
}

export async function findAllItems()
{
    const allItems = await prisma.item.findMany();
    return allItems;
}

export async function findItemById(id)
{
    const item = await prisma.item.findUnique({where: {id:id}});
    return item;
}

export async function updateItem(id, data)
{
    try
    {
        const updatedItem = await prisma.item.update({where: {id:id}, data: data});
        return updatedItem;
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

export async function deleteItem(id)
{
    try
    {
        const deletedItem = await prisma.item.delete({where: {id:id}});
        return deletedItem;
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