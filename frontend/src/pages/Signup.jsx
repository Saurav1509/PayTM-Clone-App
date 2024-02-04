import { useRecoilState } from 'recoil'
import { firstNameAtom, lastNameAtom, passwordAtom, usernameAtom } from "../store/atoms/atoms";
import axios from "axios"
import { Heading } from '../components/Heading';
import { SubHeading } from '../components/SubHeading';
import { InputBox } from '../components/InputBox';
import { Button } from '../components/Button';
import { useNavigate } from "react-router-dom";
import { BottomWarning } from '../components/BottomWarning';

function Signup() {

  const [firstName, setFirstName] = useRecoilState(firstNameAtom)
  const [lastName, setLastName] = useRecoilState(lastNameAtom)
  const [username, setUsername] = useRecoilState(usernameAtom)
  const [password, setPassword] = useRecoilState(passwordAtom)

  const navigate = useNavigate()

  return <div className='bg-slate-300 h-screen flex justify-center'>
    <div className='flex flex-col justify-center'>
      <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
        <Heading label={"Sign Up"} />
        <SubHeading label={"Enter your information to create an account"} />
        <InputBox onChange={(e) => { setFirstName(e.target.value) }} placeholder="john" label={"First Name"} />
        <InputBox onChange={(e) => { setLastName(e.target.value) }} placeholder="Jacob" label={"Last Name"} />
        <InputBox onChange={(e) => { setUsername(e.target.value) }} placeholder="name@example.com" label={"Email"} />
        <InputBox onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" label={"Password"} />
        <div className='pt-4'>
          <Button onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
              username,
              password,
              firstName,
              lastName
            });
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("firstName", response.data.firstName)
            navigate('/dashboard')
          }} label={"Sign Up"} />
        </div>
        <BottomWarning label={"Already have an Account?"} buttonText={"Sign In"} to={"/signin"} />
      </div>
    </div>
  </div>
}


export default Signup;
