import { ActionSchema, AllowedInputTypes, MicroRollup } from "@stackr/sdk";
import { stackrConfig } from "../stackr.config";
import { CreateOrder, CreateOrderBook } from "./stackr/action";
import { machine } from "./stackr/machine";
import { HDNodeWallet } from "ethers";
import { Playground } from "@stackr/sdk/plugins";
import express, {Express, Request, Response} from "express";
import cors from "cors";

const wallet = HDNodeWallet.fromPhrase("Your phrase");
const app: Express = express()
app.use(cors())
app.use(express.json())
const mru = await MicroRollup({
  config: stackrConfig,
  actionSchemas: [CreateOrderBook, CreateOrder],
  stateMachines: [machine],
});
mru.init();
Playground.init(mru);
let orderCounter = 8888; // Just for demo initialization

async function signMessage(
  wallet: HDNodeWallet,
  schema: ActionSchema,
  payload: AllowedInputTypes
) {
  const sign = wallet.signTypedData(
    schema.domain,
    schema.EIP712TypedData.types,
    payload
  );
  return sign;
}

app.post("/order", async (req:Request, res:Response) => {
  let orderInputs = {
    orderBook: "11",
    type: req.body.type,
    id: orderCounter.toString(),
    price: req.body.price.toString(),
    quantity: req.body.quantity.toString()
  };
  let orderSignature = await signMessage(wallet, CreateOrder, orderInputs);
  let createOrderAction = CreateOrder.actionFrom({
    inputs: orderInputs,
    signature: orderSignature,
    msgSender: wallet.address
  })
  let orderRes = await mru.submitAction("createOrder", createOrderAction);
  console.log(orderRes)
  orderCounter++;
  res.send(true)
})

app.listen(4000, () => {
  console.log(`[server]: Server is running at http://localhost:4000`);
});