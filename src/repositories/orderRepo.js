import prisma from "../config/db.js";

export async function createOrder(buyerId, data)
{
    try
    {
        // creates the order
        const newOrder = await prisma.order.create({data: buyerId});

        const orderId = newOrder.id;


        // the array to be returned containing all order_items 
        const tempArr = [];
        // later go back and make validator that makes sure that there is at least 1 item being added

        for( let i = 0; i < data.itemIds.length; i ++)
        {
            const order_item = await prisma.order_item.create({data: {orderId: orderId, itemId: parseInt(data.itemIds[i]), quantity: parseInt(data.quantites[i])}});
            order_item.buyer_id = buyerId;
            tempArr.push(order_item);
        }

        return tempArr;
    }
    catch(error)
    {
        if(error.code === "P2003")
        {
            const err = new Error("Not all items referenced exist");
            err.status = 404;
            throw err;
        }
        throw error;
    }
}

export async function findAllOrders()
{
    return await prisma.order.findMany();
}

export async function findOrderById(id)
{
    const order = await prisma.order.findUnique({where: {id: parseInt(id)}});
    return order;
}

export async function findOrderByIdWithItems(id)
{
    const order = await findOrderById(id);
    const tempArr = await prisma.order_item.findMany({where: {orderId: order.id}});
    for(let i = 0; i < tempArr.length; i ++)
    {
        tempArr[i].createdAt = order.createdAt;
        tempArr[i].buyerId = order.buyerId;
    }
    console.log(tempArr);
    return tempArr;
}

export async function updateOrderItem(id, itemId, data)
{
    try
    {
        const orderItem = (await prisma.order_item.findMany({where: {orderId: id, itemId: itemId}}))[0];

        const updatedOrderItem = await prisma.order_item.update({where: {id: orderItem.id}, data: data});
        updatedOrderItem.buyerId = id;
        updatedOrderItem.createdAt = (await findOrderById(id)).createdAt;
        return updatedOrderItem;
    }
    catch(error)
    {
        if(error.code === "P2025")
        {
            console.log("hi")
            return null;
        }
        throw error;
    }
}

//export async function findAllMyOrders if I work on this later

export async function removeOrderById(id)
{
    try
    {
        const deletedOrder = await prisma.order.delete({where: {id: id}});
        return deletedOrder;
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