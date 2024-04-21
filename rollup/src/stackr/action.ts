import { ActionSchema, SolidityType } from "@stackr/sdk";

export const CreateOrderBook = new ActionSchema("createOrderBook", {
    id: SolidityType.STRING
});

export const CreateOrder = new ActionSchema("createOrder", {
    orderBook: SolidityType.STRING,
    type: SolidityType.STRING,
    id: SolidityType.STRING,
    price: SolidityType.STRING,
    quantity: SolidityType.STRING
});