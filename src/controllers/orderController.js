import {addNewOrder, getAllOrders, getOrderById, getOrderByIdWithItems, updateOrderItemById, deleteOrderById} from "../services/orderService.js";

export async function addNewOrderHandler(req, res)
{
    const buyerId = req.user.id;
    const itemIds = req.body.itemIds;
    const quantites = req.body.quantites;

    const newOrder = await addNewOrder(buyerId, itemIds, quantites);
    res.status(201).json(newOrder);
}

export async function getAllOrdersHandler(req, res)
{
    const allOrders = await getAllOrders();
    res.status(200).json(allOrders);
}

export async function getOrderByIdHandler(req, res)
{
    const id = req.params.id;
    const order = await getOrderById(id);
    res.status(200).json(order);
}

export async function getOrderByIdWithItemsHandler(req, res)
{
    const id = req.params.id;
    const orderWithItems = await getOrderByIdWithItems(id);
    res.status(200).json(orderWithItems);
}

export async function updateOrderItemByIdHandler(req, res)
{
    const id = parseInt(req.params.id);
    const itemId = parseInt(req.params.itemId);
    const data = {};
    const quantity = req.body.quantity;
    if(quantity)
    {
        data.quantity = quantity;
    }
    const updatedOrderItem = await updateOrderItemById(id, itemId, data);
    res.status(200).json(updatedOrderItem);
}

export async function deleteOrderByIdHandler(req, res)
{
    const id = req.params.id;
    await deleteOrderById(id);
    res.status(204).send();
}
