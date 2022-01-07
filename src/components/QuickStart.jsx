import { Card, Timeline, Typography, Button } from "antd";
import React, { useMemo } from "react";
import { useMoralis } from "react-moralis";
import { Contract_Address, ABI } from "./config"
import Web3 from 'web3';


const { Text } = Typography;

const styles = {
  title: {
    fontSize: "20px",
    fontWeight: "700",
  },
  text: {
    fontSize: "16px",
  },
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "0.5rem",
  },
  timeline: {
    marginBottom: "-45px",
  },
};

export default function QuickStart({ isServerInfo }) {
  const { Moralis } = useMoralis();

  const { authenticate, isAuthenticated, user, logout } = useMoralis();

  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
  const account = web3.eth.getAccounts()
  const doubler = new web3.eth.Contract(ABI, Contract_Address);

  //console.log(user.get("ethAddress"))

  //console.log(doubler)

  const depositEther = async () => {
    const etherAmount = web3.utils.toWei('1', 'ether');
    window.doubler = doubler;

    try {
      await doubler.methods.join().send({ from: user.get("ethAddress"), value: etherAmount })
        .on('transactionHash', (hash) => {
          console.log("HASH");
        })
        .on('error', (err) => {
          console.log(err);
          console.log()
        })
      //code that causes an error

    } catch (e) {

      alert(e);
    }


  }


  const isInchDex = useMemo(() => (Moralis.Plugins?.oneInch ? true : false), [Moralis.Plugins?.oneInch]);

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Card
        style={styles.card}
        title={
          <>
            📝 <Text strong>Click The button to join</Text>
          </>
        }
      >
        <button onClick={depositEther} style={{ paddingLeft: "20px", paddingRight: "20px", borderRadius: "18px", border: "none", color: "white", backgroundColor: "black" }}>Join With 1Eth</button>
        <h3>{user.get("ethAddress")}</h3>
      </Card>

    </div>
  );
}
