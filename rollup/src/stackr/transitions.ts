import { REQUIRE, STF, Transitions } from "@stackr/sdk/machine";
import { OrderBookState } from "./state";
import { CreateOrderBookType, CreateOrderType, OrderBook, OrderType } from "./types";
import { matchOrders } from "./engine";

const createOrderBook: STF<OrderBookState, CreateOrderBookType> = {
    handler: ({state, inputs, msgSender}) => {
        const orderBook: OrderBook = {
            id: inputs.id,
            asks: [],
            bids: [],
            trades: {},
            operator: msgSender.toString()
        }
        state.orderBooks[inputs.id] = orderBook;
        return state
    }
}

const createOrder: STF<OrderBookState, CreateOrderType> = {
    handler: ({state, inputs, msgSender}) => {
        REQUIRE(msgSender.toString() === state.orderBooks[inputs.orderBook].operator, "Only operator can create orders");
        const order: OrderType = {
            id: inputs.id,
            price: parseFloat(inputs.price),
            quantity: parseInt(inputs.quantity)
        }

        if(inputs.type === "ask"){
            state.orderBooks[inputs.orderBook].asks.push(order)
        }else if(inputs.type === "bid"){
            state.orderBooks[inputs.orderBook].bids.push(order)
        }

        state.orderBooks[inputs.orderBook] = matchOrders(state.orderBooks[inputs.orderBook])

        return state
    }
}

export const transitions: Transitions<OrderBookState> = {
    createOrderBook,
    createOrder
}