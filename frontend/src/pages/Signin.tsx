import { Button } from '@/components/ui/button'
import { useState } from 'react'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Signin = () => {
  const [email, SetEmail] = useState("")
  const [password, SetPassword] = useState("")
  const navigate = useNavigate()
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signin`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const jwt = response.data.token
      if (!jwt) return
      localStorage.setItem("token", jwt)
      navigate("/blogs")
    } catch (error) {
      console.error("Error during signup:", error);
    }
  }

  return (
    <div className='w-[100vw] h-[100vh] flex items-center'>
      <div className='w-[50%] flex justify-center'>
        <div className='w-[450px]'>
          <Card>
            <CardHeader>
              <CardTitle><h2 className='text-3xl font-bold text-center'>Login</h2></CardTitle>
              <CardDescription>
                <div className='mt-3'>
                  <h4 className='text-xl font-semibold text-black mb-2'>Email:</h4>
                  <Input placeholder='Enter Email' type='email' value={email} onChange={(e) => SetEmail(e.target.value)} />
                </div>
                <div className='mt-3'>
                  <h4 className='text-xl font-semibold text-black mb-2'>Password:</h4>
                  <Input placeholder='Enter Password' type='password' value={password} onChange={(e) => SetPassword(e.target.value)} />
                </div>
                <div >
                  <Button className='mt-8 w-[100%]' onClick={() => {
                    handleLogin()
                  }}>Login</Button>
                </div>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
      <div className='w-[50%] bg-slate-100 h-[100%] flex justify-center items-center'>
        <div className='px-[7rem] text-justify flex flex-col'>
          <h2 className='text-4xl font-bold'>"The customer service I recieved was exceptional . The support team went above and beyond to address my concerns."</h2>
          <span className='mt-4 font-semibold'>Jules Winnfield</span>
          <span className='text-slate-500'>CEO,Acme Inc</span>
        </div>
      </div>
    </div>
  )
}

export default Signin
