import { useRecoilState } from 'recoil'
import { firstNameAtom, lastNameAtom, passwordAtom, usernameAtom } from "../store/atoms/atoms";
import axios from "axios"
import { Heading } from '../components/Heading';
import { SubHeading } from '../components/SubHeading';
import { InputBox } from '../components/InputBox';
import { Button } from '../components/Button';
import { BottomWarning } from '../components/BottomWarning';
import { useNavigate } from "react-router-dom";

function Signin() {

  const [username, setUsername] = useRecoilState(usernameAtom)
  const [password, setPassword] = useRecoilState(passwordAtom)

  const navigate = useNavigate()

  return <div className='bg-slate-300 h-screen flex justify-center'>
    <div className='flex flex-col justify-center'>
      <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
        <Heading label={"Sign In"} />
        <SubHeading label={"Enter your information to Sign In to your account"} />
        <InputBox onChange={(e) => { setUsername(e.target.value) }} placeholder="name@example.com" label={"Email"} />
        <InputBox onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" label={"Password"} />
        <div className='pt-4'>
          <Button onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
              username,
              password
            });
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("firstName", response.data.firstName)
            navigate('/dashboard')
          }} label={"Sign In"} />
        </div>
        <BottomWarning label={"Dont have an account?"} buttonText={"Sign Up"} to={"/signup"} />
      </div>
    </div>
  </div>
}


export default Signin;
