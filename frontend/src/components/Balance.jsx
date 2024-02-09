import axios from "axios"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { balanceAtom } from "../store/atoms/atoms"

export function Balance() {
  const [balance, setBalance] = useRecoilState(balanceAtom)
  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/account/balance", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }).then((response) => {
      setBalance(response.data.balance)
    })
  }, [balance])

  return <div className="flex">
    <div className="font-bold text-2xl pt-1 px-4 pb-4">Account Balance:</div>
    <div className="text-slate-800 text-2xl pt-1 pb-4">Rs. {balance}</div>
  </div>
}
