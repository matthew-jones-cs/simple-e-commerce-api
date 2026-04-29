import {addItem, getAllItems, getItemById, updateItemById, deleteItemById} from "../services/itemService.js";

export async function addItemHandler(req, res)
{
    //console.log(req.params);
    const {name, price, description} = req.body;
    const amount = parseInt(req.body.amount);
    const sellerId = req.user.id; // gets the sellers id (the id of the person adding the item)
    const item = await addItem(name, price, amount, description, sellerId);
    res.status(201).json(item);
}

export async function getAllItemsHandler(req, res)
{
    const items = await getAllItems();
    res.status(200).json(items);
}

export async function getItemByIdHandler(req, res)
{
    const id = parseInt(req.params.id);
    const item = await getItemById(id);
    res.status(200).json(item);
}

export async function updateItemByIdHandler(req, res)
{
    const id = parseInt(req.params.id);
    const data = {};
    const name = req.body.name;
    const price = req.body.price;
    const amount = parseInt(req.body.amount);
    const description = req.body.description;
    if(name)
    {
        data.name = name;
    }
    if(price)
    {
        data.price = price;
    }
    if(amount)
    {
        data.amount = amount;
    }
    if(description)
    {
        data.description = description;
    }
    const updatedItem = await updateItemById(id, data);
    res.status(200).json(updatedItem);
}

export async function deleteItemByIdHandler(req, res)
{
    const id = parseInt(req.params.id);
    await deleteItemById(id);
    res.status(204).send();
}