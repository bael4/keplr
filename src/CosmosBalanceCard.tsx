import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { StargateClient } from "@cosmjs/stargate";

import { Window as KeplrWindow } from "@keplr-wallet/types";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends KeplrWindow {
    getOfflineSigner:Function
  }
}

type CardProps  = {
    chainId:string,
    rpcEndpoint: string,
    token: string,
    tokenName:string,
}


 const CosmosBalanceCard:React.FC<CardProps> = (props) => {
    const {chainId, rpcEndpoint, token, tokenName} = props

    // Usetstate for storing wallets details state.
    const [cosmosAddress, setCosmosAddress] = useState("");
    const [cosmosBalance, setCosmosBalance] = useState<null | number>(null);
    const [cosmosToken, setCosmosToken] = useState<null | string>(null);
    const buttonHandlerKeplrConnect = async() => {

        if (window.keplr) {
            await window.keplr.enable(chainId); 
            const offlineSigner = await window.getOfflineSigner(chainId);
            const keplrAccounts = await offlineSigner.getAccounts();
            setCosmosAddress(keplrAccounts[0].address);
        } else {
            alert("Keplr extension is not installed.");
        }
    };


    const buttonHandlerKeplrBalance = async() => {

        const client = await StargateClient.connect(rpcEndpoint);

        const balanceAsCoin = await client.getBalance(cosmosAddress, token);
        const balance = parseInt(balanceAsCoin.amount) * 1;

        setCosmosBalance(balance);
        setCosmosToken(tokenName);
    };

    return (
        <>
            <Card.Text>
                <label>
                    Available balance of {cosmosAddress}: {cosmosBalance} {cosmosToken}
                </label>
            </Card.Text>

            <Button data-testid="keplr-button" onClick={buttonHandlerKeplrConnect} variant="primary" className="me-2">
                Connect to Keplr
            </Button>

            <Button onClick={buttonHandlerKeplrBalance} variant="primary" disabled={!cosmosAddress}>
                Get balance
            </Button>
        </>
    )
}
export default CosmosBalanceCard
