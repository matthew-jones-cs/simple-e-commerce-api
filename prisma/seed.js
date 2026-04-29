import bcrypt from "bcrypt";
import "dotenv/config";
import prisma from "../src/config/db.js";

try
{
    await prisma.$queryRaw`TRUNCATE users, items, reviews, orders, order_items RESTART IDENTITY CASCADE;`;
    
    const userData = [
        {password: "ovr8478do", name: "Bob Smith", email: "bob123@example.com", role: "USER", address: "83 Bedrock Road"},
        {password: "≈P0(203ijd", name: "Scott", email: "scott@example.com", role: "ADMIN", address: "101 Admin Road"},
        {password: "11qq22ww33ee", name: "Katey R", email: "kateyr@example.com", role: "SELLER", address: "203 Seller Road"},
    ];

    const ratingArr = ["One", "Two", "Three", "Four", "Five"];

    const count = 1; // user count

    const users = [];

    for (const uData of userData)
    {
        const hashedPassword = await bcrypt.hash(uData.password, 10);
        const data = {};
        data.password = hashedPassword;
        data.name = uData.name;
        data.email = uData.email;
        data.role = uData.role;
        data.address = uData.address;
        const user = await prisma.user.create({data: data});

        users.push(user);
    }

    // makes items
    for (const user of users)
    {
        // SELLERS and ADMINS only
        if(!(user.role === "USER"))
        {
            await prisma.item.createManyAndReturn(
            {
                data: [
                {
                    sellerId: user.id,
                    name: `Item number 1 sold by ${user.role === "SELLER"? user.name: "this website its self"}.`,
                    price: 4.99 + user.id,
                    amount: 120 - user.id,
                    description: `This is the first product sold by ${user.role === "SELLER"? user.name: "this website its self"}.`,
                },
                {
                    sellerId: user.id,
                    name: `Item number 2 sold by ${user.role === "SELLER"? user.name: "this website its self"}.`,
                    price: 10.99 - user.id,
                    amount: 32 + user.id,
                    description: `This is the second product sold by ${user.role === "SELLER"? user.name: "this website its self"}.`,
                },
                ],
            });
        }
    }
    //makes reviews
    for (const user of users)
    {
        if(!(user.role === "ADMIN"))
        {
            const item_id = ((user.id + 1) % (users.length - count)) * 2 + 1;
            const item1 = (await prisma.item.findUnique({ where: {id: item_id}})).name;
            const item2 = (await prisma.item.findUnique({ where: {id: item_id + 1}})).name;
            await prisma.review.createMany(
            {
                data: [
                {
                    authorId: user.id,
                    itemId: item_id,
                    title: `Review of \"${item1}\" from ${user.name}`,
                    content: "My review rating is random (This is my first review).",
                    rating: ratingArr[Math.floor(Math.random() * 5)]
                },
                {
                    authorId: user.id,
                    itemId: item_id + 1,
                    title: `Review of \"${item2}\" from ${user.name}`,
                    content: "My review rating is random (This is my second review).",
                    rating: ratingArr[Math.floor(Math.random() * 5)]
                },
                ],
            });
        }
    }
    
    // makes orders
    for (const user of users)
    {
        if(!(user.role === "ADMIN"))
        {
            const item_id = ((user.id + 1) % (users.length - count)) * 2 + 1;
            
            const order = await prisma.order.create({data: {buyerId: user.id}});
            
            await prisma.order_item.createMany(
            {
                data: [
                {
                    orderId: order.id,
                    itemId: parseInt(item_id),
                    quantity: Math.ceil(Math.random() * 5),
                },
                {
                    orderId: order.id,
                    itemId: parseInt(item_id) + 1,
                    quantity: Math.ceil(Math.random() * 5),
                }
                ]
            });
        }
    }

}
catch(error)
{
    console.error("Seed failed:", error);
}
finally
{
    await prisma.$disconnect();
}