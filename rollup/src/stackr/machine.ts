import {BytesLike, State, StateMachine} from "@stackr/sdk/machine";
import * as genesis from "../../genesis-state.json";
import { transitions } from "./transitions";
import { OrderBookState } from "./state";

const machine = new StateMachine({
    id: "orderbook",
    stateClass: OrderBookState,
    initialState: genesis.state,
    on: transitions
})

export {machine};