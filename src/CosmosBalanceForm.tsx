import React, { useState} from "react";
import { Form, Card } from "react-bootstrap";
import  CosmosBalanceCard  from "./CosmosBalanceCard";

const CosmosBalanceForm:React.FC = ()=> {
  // Usetstate for storing ComboBox details state.
  const [chainId, setChainId] = useState("cosmoshub-4");
  const [token, setToken] = useState("uatom");
  const [rpcEndpoint, setRpcEndpoint] = useState("https://rpc.atomscan.com/");
  // const [exponent, setExponent] = useState(1e6)
  const [tokenName, setTokenName] = useState("ATOM");
  interface GenericObject {
    [key: string]: any;
  }
  const defaultVariantValues: GenericObject = {
    "cosmoshub-4": {
      token: "uatom",
      rpcEndpoint: "https://rpc.atomscan.com/",
      tokenName: "ATOM",
    },
    "osmosis-1": {
      token: "uosmo",
      rpcEndpoint: "https://rpc-osmosis.blockapsis.com/",
      tokenName: "OSMO",
    },
    other: { token: "", rpcEndpoint: "", tokenName: "" },
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChainId(e.currentTarget.value);
    if (defaultVariantValues[e.currentTarget.value]) {
      setToken(defaultVariantValues[e.currentTarget.value]["token"]);
      setRpcEndpoint(
        defaultVariantValues[e.currentTarget.value]["rpcEndpoint"]
      );
      setTokenName(defaultVariantValues[e.currentTarget.value]["tokenName"]);
    }
  };

  return (
    <Card className="text-center row">
      <Card.Header>
        <strong>Cosmos SDK Balance</strong>
      </Card.Header>
      <Card.Body>
        <Form className="col col-6 mx-auto">
          <Form.Group className="mb-3">
            <Form.Label>Select chain:</Form.Label>
            <Form.Select
              onChange={(e) => {
                handleSelect(e);
              }}
            >
              <option value={"cosmoshub-4"}>Cosmos Hub v4</option>
              <option value={"osmosis-1"}>Osmosis v1</option>
              <option value={"other"}>Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>RPC endpoint:</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={rpcEndpoint}
              onChange={(e) => setRpcEndpoint(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Token:</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Token name:</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
            />
          </Form.Group>

          <CosmosBalanceCard
            chainId={chainId}
            rpcEndpoint={rpcEndpoint}
            token={token}
            tokenName={tokenName}
          />
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CosmosBalanceForm;
