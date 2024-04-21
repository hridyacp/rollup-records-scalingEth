import {MerkleTree} from "merkletreejs";
import { OrderBook, OrderBookRollup, OrderType, Trade } from "./types";
import { solidityPackedKeccak256 } from "ethers";

export const constructTree = (state: OrderBookRollup): string => {
    const orderBookHashes = Object.entries(state.orderBooks).map(
        ([orderBookId, orderBook]) => solidityPackedKeccak256(["string", "string"], [orderBookId, getOrderBookHash(orderBook)])
    );
    const orderBookHash = new MerkleTree([orderBookHashes[0]]).getHexRoot();
    return orderBookHash;
}


const getOrderBookHash = (orderBook: OrderBook): string => {
    const asksHash = getOrderHash(orderBook.asks);
    const bidsHash = getOrderHash(orderBook.bids);
    const tradeHash = getTradeHash(orderBook.trades);
    const orderHash = new MerkleTree([orderBook.id, asksHash, bidsHash, tradeHash, orderBook.operator]).getHexRoot();
    return orderHash;
}

const getOrderHash = (orders: OrderType[]): string => {
    const hashes = orders.map((order) => solidityPackedKeccak256(["string", "uint256", "uint256"], [order.id, order.price, order.quantity]));
    const ordersRoot = new MerkleTree(hashes).getHexRoot();
    return ordersRoot;
}

const getTradeHash = (trades: Record<string, Trade>): string => {
    const hashes = Object.entries(trades).map(
        ([tradeId, trade]) => solidityPackedKeccak256(["string", "string", "string", "string", "uint256", "uint256"], [tradeId, trade.id, trade.askId, trade.bidId, trade.price, trade.quantity])
    );
    const tradesRoot = new MerkleTree(hashes).getHexRoot();
    return tradesRoot;
}