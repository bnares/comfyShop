import React from 'react'
import { FormInput, SubmitBtn } from '../components';
import {Form, Link, useNavigate, redirect} from "react-router-dom";
import { customFetch } from '../utils';
import { toast } from 'react-toastify';
import { loginUser } from '../features/user/UserSlice';
import { useDispatch } from 'react-redux';


export const action = (store) =>async ({request})=>{ //this way with action which returns action is made only becouse in App.tsx in login action we pass as e parameter store from reacr redux
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log("data: ", data);
  try{
    const response = await customFetch.post("/auth/local",data);
    console.log("Login response: ", response);
    toast.success("logged in successfully");
    store.dispatch(loginUser(response.data));
    return redirect("/");
    //return null;
  }catch(error){
    const errorMessage = error?.response?.data?.error?.message || "PLease double check your credentials";
    toast.error(errorMessage);
    return null;
  }
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAsGuestUser = async ()=>{
    try{
      const response = await customFetch.post("/auth/local",{
        identifier:"test@test.com",
        password:"secret"
      });
      dispatch(loginUser(response.data));
      toast.success("Welcome guest user");
      navigate("/");
    }catch(error){
      console.log(error);
      toast.error("Guest user login error, try again");
    }
  }
  return (
    <section className='h-screen grid place-items-center'>
      <Form method='POST' className='card w-96 py-8 px-8 bg-base-100 shadow-lg flex flex-col gap-y-4'>
        <h4 className='text-center text-3xl font-bold'>Login</h4>
        <FormInput name='identifier' type='email' label='email' defaultValue=''/>
        <FormInput type='password' label='Password' name="password" defaultValue='' />
        <div className="mt-4">
          <SubmitBtn text='Login' />
          
        </div>
        <button 
          type='button' 
          className='btn btn-secondary btn-block'
          onClick={loginAsGuestUser}
        >
          Guest User
        </button>
        <p className='text-center'>Not a member yet? <Link to="/register" className='ml-2 link link-hover link-primary capitalize'> Register</Link></p>
        
      </Form>
    </section>
  )
}

export default Login
