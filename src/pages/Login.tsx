import React from 'react'
import { FormInput, SubmitBtn } from '../components';
import {Form, Link} from "react-router-dom";

const Login = () => {
  
  return (
    <section className='h-screen grid place-items-center'>
      <Form method='post' className='card w-96 py-8 px-8 bg-base-100 shadow-lg flex flex-col gap-y-4'>
        <h4 className='text-center text-3xl font-bold'>Login</h4>
        <FormInput name='identifier' type='email' label='email' defaultValue='test@test.com'/>
        <FormInput type='password' label='Password' name="password" defaultValue='secret' />
        <div className="mt-4">
          <SubmitBtn text='Login' />
          
        </div>
        <button type='button' className='btn btn-secondary btn-block'>Guest User</button>
        <p className='text-center'>Not a member yet? <Link to="/register" className='ml-2 link link-hover link-primary capitalize'> Register</Link></p>
        
      </Form>
    </section>
  )
}

export default Login
