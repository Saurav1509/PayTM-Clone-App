import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { amountAtom } from '../store/atoms/atoms';
import axios from 'axios';

function SendMoney() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useRecoilState(amountAtom)

  return <div className='flex justify-center h-screen bg-gray-300'>
    <div className='h-full flex flex-col justify-center'> {/*brings the card to the center in height */}
      <div className='border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 shadow-lg bg-white rounded-lg'> {/* actual card in the center */}
        <div className="flex flex-col space-y-1.5 p-6">
          <h1 className='text-3xl font-bold text-center'>Send Money</h1>
        </div>
        <div className='p-6'>
          <div className='flex items-center space-x-4'>
            <div className='w-12 h-12 bg-green-500 rounded-full flex items-center justify-center'>
              <span className='text-2xl text-white p-1'>{name[0].toUpperCase()}</span>
            </div>
            <h3 className='text-2xl font-semibold'>{name}</h3>
          </div>
          <div className='font-semibold p-2'>Amount (in Rs.)</div>
          <input
            onChange={(e) => {
              setAmount(e.target.value)
            }}
            className='border h-10 w-full border-input bg-background px-3 py-2 text-sm'
            type='number'
            placeholder='Enter Amount' />
          <button onClick={async () => {
            const reponse = await axios.post("http://localhost:3000/api/v1/account/transfer", {
              to: id,
              amount
            }, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
              }
            })
            navigate("/dashboard")
          }}
            className='transition ease-in-out delay-150 bg-green-500 hover:-translate-y-1 hover:scale-103 hover:bg-lime-500 duration-300 rounded-lg p-2 w-full my-2'>Send</button>
        </div>
      </div>
    </div>
  </div>
}

export default SendMoney;
