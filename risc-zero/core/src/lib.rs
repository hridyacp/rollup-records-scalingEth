use serde::{Deserialize, Serialize};


#[derive(Clone, Debug, Deserialize, Eq, PartialEq, Serialize)]
pub struct OrderBook{
    pub asks: [Order;5],
    pub bids: [Order;5]
}

#[derive(Clone, Debug, Deserialize, Eq, PartialEq, Serialize)]
pub struct Order{
    pub price: u32,
    pub quantity: u32
}