import {createItem, findAllItems, findItemById, updateItem, deleteItem} from "../repositories/itemRepo.js";

export async function addItem(name, price, amount, description, sellerId)
{
    const newItem = await createItem({name, price, amount, description, sellerId});
    return newItem;
}

function thereOrNot(id, item)
{
    if (item)
    {
        return item;
    }
    else
    {
        const error = new Error(`Item ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function getAllItems()
{
    const allItems = await findAllItems();
    return allItems;
}

export async function getItemById(id)
{
    const item = await findItemById(id);
    return thereOrNot(id, item);
}

export async function updateItemById(id, data)
{
    const updatedItem = await updateItem(id, data);
    return thereOrNot(id, updatedItem);
}

export async function deleteItemById(id)
{
    const deletedItem = await deleteItem(id);
    if (deletedItem)
    {
        return ;
    }
    else
    {
        const error = new Error(`Item ${id} not found`);
        error.status = 404;
        throw error;
    }
}

