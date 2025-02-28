import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { clearCart } from '../features/cart/CartSlice';
import { logoutUser } from '../features/user/UserSlice';

const Header = () => {
    const user  = useSelector(state=>state.userState.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = ()=>{
        navigate("/");
        dispatch(clearCart());
        dispatch(logoutUser());

    }

  return (
    <header className='bg-neutral py-2 text-neutral-content'>
        <div className="align-element flex justify-center sm:justify-end">
            {/* USER */}
            {user === null ? 
            (
            <div className="flex gap-x-6 justify-center items-center">
                <Link to="/login" className = "link link-hover text-xs sm:text-sm">
                    Sign in / Guest
                </Link>
                <Link to="/register" className = "link link-hover text-xs sm:text-sm">
                    Create Account
                </Link>
            </div>) : (
            <div className='flex gap-2 sm:gap-x-8 items-center'>
                <p className='text-xs sm:text-sm'>Hello, {user.username}</p>
                <button 
                    className='btn btn-xs btn-outline btn-primary'
                    onClick={handleLogout}
                >
                    logout
                </button>
            </div>) }
        </div>
    </header>
  )
}

export default Header
