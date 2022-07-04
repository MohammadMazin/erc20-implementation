import { useEffect, useState } from "react"
import './App.css';

const ContractUse = ({ contract, provider, signer, address }) => {

    const [totalSupply, setTotalSupply] = useState("")
    const [balance, setBalance] = useState("")
    const [allowance, setAllowance] = useState("")
    const [name, setName] = useState("")
    const [symbol, setSymbol] = useState("")
    const [decimals, setDecimals] = useState("")

    const [isLoaded, setIsLoaded] = useState(false)
    const admin = "0xf17091ebfd7bd5a9b134961f1dabc5a6839bb9e5"

    useEffect(() => {
        getTokenDetails();
    })


    const getTotalSupply = async () => {
        let val = await contract.totalSupply();
        setTotalSupply(val.toString())
    }

    const getTokenDetails = async () => {

        let getName = await contract._name();
        setName(getName);
        let getSymbol = await contract._symbol();
        setSymbol(getSymbol);
        let getDecimals = await contract._decimals();
        setDecimals(getDecimals.toString());

        setIsLoaded(true)
    }

    const balanceOf = async (address) => {
        let val = await contract.balanceOf(address);
        setBalance(val.toString())
    }

    const handleMintSubmit = async (e) => {
        e.preventDefault();
        let mintValue = e.target[0].value
        if (mintValue <= 0)
            return alert("Enter a value greater than 0")
        let val = await contract.mint(mintValue);
        e.target[0].value = 0
    }

    const handleBurnSubmit = async (e) => {
        e.preventDefault();
        let burnValue = e.target[0].value
        if (burnValue <= 0)
            return alert("Enter a value greater than 0")
        let val = await contract.burn(burnValue);
        e.target[0].value = 0
    }

    const handleTransferSubmit = async (e) => {
        e.preventDefault();
        let account = e.target[0].value
        let amount = e.target[1].value

        if (amount <= 0)
            return alert("Enter a value greater than 0")
        let val = await contract.transfer(account, amount);
        e.target[0].value = ""
        e.target[1].value = 0
    }


    const handleApproveSubmit = async (e) => {
        e.preventDefault();
        let account = e.target[0].value
        let amount = e.target[1].value

        if (amount <= 0)
            return alert("Enter a value greater than 0")
        let val = await contract.approve("0xBD7b244b565D5D9713a62bF7828C5D675AB97480", amount);
        e.target[0].value = ""
        e.target[1].value = 0
    }

    const handleGetAllowance = async (e) => {
        e.preventDefault();
        let account = e.target[0].value

        let val = await contract.allowance(account);
        console.log(val.toString())
        e.target[0].value = ""
        setAllowance(val.toString())
    }

    const handleTransferFromSubmit = async (e) => {
        e.preventDefault();
        let from = e.target[0].value
        let to = e.target[1].value
        let amount = e.target[2].value

        if (amount <= 0)
            return alert("Enter a value greater than 0")
        let val = await contract.transferFrom(from, to, amount);
        e.target[0].value = ""
        e.target[1].value = ""
        e.target[2].value = 0
    }


    return (
        <>
            {!isLoaded ?
                <h1>Loading...</h1>
                :
                <>
                    <div className="f tokenDetail" style={{ justifyContent: "space-around", margin: "auto" }}>
                        <h3>Name: <span>{name}</span></h3>
                        <h3>Symbol: <span>{symbol}</span></h3>
                        <h3>Decimals: <span>{decimals}</span></h3>
                    </div>

                    <h1 className="functionTitle">Function Calls</h1>
                    <div style={{ display: "flex", width: "60%", margin: "auto" }}>
                        <div className="f f-r function">
                            <button onClick={getTotalSupply} className="functionCall">Total Supply</button>
                            {totalSupply}
                        </div>

                        <div className="f f-r function">
                            <button onClick={() => balanceOf(address)} className="functionCall">Check Your Balance</button>
                            {balance}
                        </div>
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", maxWidth: "60%", margin: "auto", alignItems: "flex-start" }}>



                        {address === admin &&
                            <form onSubmit={handleMintSubmit}>
                                <label>
                                    Mint Tokens (only by admin):
                                </label>
                                <input required type="number" name="mintToken" placeholder="Enter Amount" />
                                <input type="submit" value="Submit" className="submit" />
                            </form>
                        }

                        <form onSubmit={handleBurnSubmit}>
                            <label>
                                Burn Tokens:
                            </label>
                            <input type="number" name="burnToken" placeholder="Enter Amount" required />
                            <input type="submit" value="Submit" className="submit" />
                        </form>

                        <form onSubmit={handleTransferSubmit}>
                            <label>
                                Transfer:
                            </label>
                            <input type="text" name="address" placeholder="Enter Address" required style={{ width: "90%" }} />
                            <input type="number" name="amount" placeholder="Enter Amount" required />
                            <input type="submit" value="Submit" className="submit" />
                        </form>

                        <form onSubmit={handleApproveSubmit}>
                            <label>
                                Approve Allowance:
                            </label>
                            <input type="text" name="address" placeholder="Enter Address" required style={{ width: "90%" }} />
                            <input type="number" name="amount" placeholder="Enter Amount" required />
                            <input type="submit" value="Submit" className="submit" />
                        </form>

                        <form onSubmit={handleGetAllowance}>
                            <label>
                                Get Allowance:
                            </label>
                            <input type="text" name="address" placeholder="Enter Address" required style={{ width: "90%" }} />
                            {allowance}
                            <input type="submit" value="Submit" className="submit" />
                        </form>

                        <form onSubmit={handleTransferFromSubmit}>
                            <label>
                                Transfer:
                            </label>
                            <input type="text" name="address" placeholder="From Address" required style={{ width: "90%" }} />
                            <input type="text" name="address" placeholder="To Address" required style={{ width: "90%" }} />
                            <input type="number" name="amount" placeholder="Enter Amount" required />
                            <input type="submit" value="Submit" className="submit" />
                        </form>

                    </div>
                </>

            }

        </>

    )
}

export default ContractUse