import { BytesLike, State } from "@stackr/sdk/machine";
import { OrderBookRollup } from "./types";
import { constructTree } from "./tree";

export class OrderBookState extends State<OrderBookRollup>{

    constructor(state: OrderBookRollup){
        super(state);
    }

    getRootHash(): BytesLike {
        return constructTree(this.state);
        //return "0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563";
    }

}