use methods::{
    HELLO_GUEST_ELF, HELLO_GUEST_ID
};
use risc0_zkvm::{default_prover, ExecutorEnv};

fn main() {

    tracing_subscriber::fmt()
        .with_env_filter(tracing_subscriber::filter::EnvFilter::from_default_env())
        .init();

    let bid_price = [1,2,3,4,5];
    let bid_qn = [1,2,3,4,5];
    let ask_price = [1,12,13,14,15];
    let ask_qn = [1,2,3,4,5];


    let env = ExecutorEnv::builder()
        .write_slice(&bid_price)
        .write_slice(&bid_qn)
        .write_slice(&ask_price)
        .write_slice(&ask_qn)
        .build()
        .unwrap();


    let prover = default_prover();
    let receipt = prover
        .prove(env, HELLO_GUEST_ELF)
        .unwrap();
    let _output:(u32,u32) = receipt.journal.decode().unwrap();
    receipt
        .verify(HELLO_GUEST_ID)
        .unwrap();
}
