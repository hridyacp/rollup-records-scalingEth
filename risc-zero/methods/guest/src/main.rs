#![no_main]
// If you want to try std support, also update the guest Cargo.toml file
#![no_std]  // std support is experimental

use risc0_zkvm::guest::env;
risc0_zkvm::guest::entry!(main);


fn main() {

    // Reading the required iinputs for the orderbook
    let mut bid_price: [u32;5] = [0;5];
    env::read_slice(&mut bid_price);
    let mut bid_qn : [u32;5] = [0;5];
    env::read_slice(&mut bid_qn);
    let mut ask_price : [u32;5] = [0;5];
    env::read_slice(&mut ask_price);
    let mut ask_qn : [u32;5] = [0;5];
    env::read_slice(&mut ask_qn);

    for i in 0..5{
        let bid:(u32, u32) = (bid_price[i], bid_qn[i]);
        for j in 0..5{
            let ask:(u32, u32) = (ask_price[j], ask_qn[j]);
            if bid.0 == ask.0 && bid.1 <= ask.1 {
                env::commit(&(bid.0, bid.1));
                break;
            }
        }
    }


}
