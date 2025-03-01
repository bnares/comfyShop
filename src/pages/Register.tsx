import React from 'react'
import { Form, Link, redirect } from 'react-router-dom'
import { FormInput, SubmitBtn } from '../components'
import { customFetch } from '../utils';
import { toast } from 'react-toastify';

export const action = async ({request})=>{
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try{
    const response = await customFetch.post("/auth/local/register",data);
    toast.success("Account created");
    return redirect("/login")
  }catch(error){
    const errorMessage = error?.response?.data?.error?.message || "PLease double check your credentials";
    toast.error(errorMessage);
    return null;
  }
  
}

const Register = () => {
  return (
   <section className='h-screen grid place-items-center'>
    <Form method='post' className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'>
      <h4 className='text-center text-3xl font-bold'>
        Register
      </h4>
      <FormInput type='text' label='username' name="username" defaultValue='Piotr Ostrouch'/>
      <FormInput type='email' label='email' name="email" defaultValue='test@o2.pl'/>
      <FormInput type='password' label='password' name="password" defaultValue='p@$$w0rd'/>
      <div className='mt-4'>
        <SubmitBtn text='register' />
      </div>
      <p className='text-center'>Already have an Account? <Link to="/login" className='ml-2 link link-hover link-primary capitalize'> Login</Link></p>
        
    </Form>
   </section>
  )
}

export default Register
