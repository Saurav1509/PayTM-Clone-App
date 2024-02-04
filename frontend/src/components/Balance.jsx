export function Balance({ balance }) {
  return <div className="flex">
    <div className="font-bold text-2xl pt-1 px-4 pb-4">Your Balance is:</div>
    <div className="text-slate-800 text-2xl pt-1 pb-4">Rs. {balance}</div>
  </div>
}
