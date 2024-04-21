export type OrderBook = {
    id: string,
    asks: OrderType[],
    bids: OrderType[],
    trades: Record<string, Trade>,
    operator: string
};

export type OrderType = {
    id: string,
    price: number,
    quantity: number
}

export type Trade = {
    id: string,
    askId: string,
    bidId: string,
    price: number,
    quantity: number
}

export type OrderBookRollup = {
    orderBooks: Record<string, OrderBook>
}

export type CreateOrderBookType = {
    id: string
}

export type CreateOrderType = {
    orderBook: string,
    type: string,
    id: string,
    price: string,
    quantity: string
}