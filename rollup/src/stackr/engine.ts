import { OrderBook, Trade } from "./types"

export const matchOrders = (state: OrderBook): OrderBook => {
    state.asks = state.asks.slice().sort((a,b) => a.price - b.price);
    state.bids = state.bids.slice().sort((a,b) => b.price - a.price);
    for(let bidIndex=0; bidIndex<state.bids.length; bidIndex++){
        const bid = state.bids[bidIndex];
        for(let askIndex=0; askIndex<state.asks.length; askIndex++){
            const ask = state.asks[askIndex];
            if(ask.price === bid.price){
                const trade: Trade = {
                    id: ask.id+bid.id+Date.now(),
                    askId: ask.id,
                    bidId: bid.id,
                    price: bid.price,
                    quantity: bid.quantity
                };
                state.trades[trade.id] = trade;
                if(bid.quantity === ask.quantity){
                    state.asks.splice(askIndex,1)
                    askIndex--
                    state.bids.splice(bidIndex, 1)
                    bidIndex--
                }else if(bid.quantity > ask.quantity){
                    state.bids[bidIndex].quantity -= ask.quantity
                    state.asks.splice(askIndex,1)
                    askIndex--
                }
            }
        }
    }
    return state
}