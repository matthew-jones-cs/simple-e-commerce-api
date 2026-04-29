import {createOrder, findAllOrders, findOrderById, findOrderByIdWithItems, updateOrderItem, removeOrderById} from "../repositories/orderRepo.js";


function thereOrNot(id, order)
{
    if (order)
    {
        return order;
    }
    else
    {
        const error = new Error(`Order ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function addNewOrder(buyerId, itemIds, quantites)
{
    const newOrder = await createOrder({buyerId}, {itemIds, quantites});
    return newOrder;
}


export async function getAllOrders()
{
    const allOrders = await findAllOrders();
    if (allOrders)
    {
        return allOrders;
    }
    else
    {
        const error = new Error("There are no orders in the database.");
        error.status = 404;
        throw error;
    }
}

export async function getOrderById(id)
{
    const order = await findOrderById(id);
    return thereOrNot(id, order);
}

export async function getOrderByIdWithItems(id)
{
    const orderWithItems = await findOrderByIdWithItems(id);
    return thereOrNot(id, orderWithItems);
}

export async function updateOrderItemById(id, itemId, data)
{
    const updatedOrderItem = await updateOrderItem(id, itemId, data);
    if (updatedOrderItem)
    {
        return updatedOrderItem;
    }
    else
    {
        const error = new Error(`Either order ${id} not found or order ${id} with item id ${itemId} not found.`);
        error.status = 404;
        throw error;
    }
}

export async function deleteOrderById(id)
{
    const deletedOrder = await removeOrderById(id);
    if (deletedOrder)
    {
        return ;
    }
    else
    {
        const error = new Error(`Order ${id} not found`);
        error.status = 404;
        throw error;
    }
}