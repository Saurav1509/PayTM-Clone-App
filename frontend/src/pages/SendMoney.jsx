import { useSearchParams } from 'react-router-dom';

function SendMoney() {
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");
  const name = searchParams.get("name");

  return <div className="h-screen flex justify-center items-center bg-gray-600/50">
    <div className="h-3/4 sm:h-1/2  flex flex-cols justify-center space-y-10 flex-col items-center max-w-3xl sm:m-10 m-4 sm:p-20 p-5 rounded-lg bg-white">
      <h1 className="text-3xl font-bold">Send Money</h1>
      <div className="rounded-full h-12 w-12 bg-green-300 flex justify-center mt-1 mr-2">
        <div className="flex flex-col justify-center h-full text-xl">
          {name[0].toUpperCase()}
        </div>
      </div>
      <div className="flex flex-col justify-center h-ful">
        <div>
          {name}
        </div>
      </div>
    </div>
  </div>
}

export default SendMoney;
