# Rollup Records

Rollup Records in a Micro rollup specifically made to handle order matching needs. Many Defi protocols struggle with onchain order matching because of it's high computational needs(which EVM, Move VM etc. can't fulfil). Thus, we shifted the whole process off-chain by building a micro-rollup for matching orders. Also, we have integrated RiscZero VM which will generate proofs of orders being matched in our rollup.

We have used Stackr SDK to build the core micro-rollup in typescript. All the state management and action management is handled by Stackr SDK. We have defined two actions on our rollup one is to create orderbook and other is to create orders on specific orderbooks. We have used RiscZero's zkVM to generate proofs of orders being matches in our rollup. Moreover, the interface to our rollup is just a simple REST API. The frontend is built with React and Material UI.

![orderbook-rollup](https://github.com/hridyacp/rollup-records-scalingEth/assets/66505181/e4ff06ab-15e7-4ab1-a85c-31bbf56a14c2)
