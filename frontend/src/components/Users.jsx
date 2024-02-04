import { usersAtom, filterAtom } from "../store/atoms/atoms";
import { useEffect } from "react";
import axios from "axios"
import { useRecoilState } from "recoil";
import { Button } from "./Button";

export function Users({ label, onClick }) {
  const [users, setUsers] = useRecoilState(usersAtom);
  const [filter, setFilter] = useRecoilState(filterAtom)

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
      .then(response => {
        setUsers(response.data.user)
      })
  }, [filter])

  return <div>
    <div className="font-bold text-2xl pt-1 px-4 pb-4">Users</div>
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
      </div>
      <input onChange={(e) => { setFilter(e.target.value); }} type="search" id="default-search" className="block w-full p-4 ps-10  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={label} required />
      <button onClick={onClick} type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
    <div>
      {users.map(user => <User user={user} />)}
    </div>
  </div>
}


function User({ user }) {
  return <div className="flex justify-between">
    <div className="flex">
      <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
        <div className="flex flex-col justify-center h-full text-xl">
          {user.firstName[0]}
        </div>
      </div>
      <div className="flex flex-col justify-center h-ful">
        <div>
          {user.firstName} {user.lastName}
        </div>
      </div>
    </div>
    <div className="flex flex-col justify-center h-ful">
      <Button onClick={(e) => {
        console.log("Send money button was Clicked")
      }} label={"Send Money"} />
    </div>
  </div>
}
