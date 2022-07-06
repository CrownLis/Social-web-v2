import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import style from './SignIn.module.css'

const SignIn:FC = () => {
    return (
        <div>
        <form className={style.container}>
            <label htmlFor='login'>Login</label>
            <input id='login'></input>
            <label htmlFor='password'>Password</label>
            <input id='password' type='password'></input>
            </form>
            <div className={style.btn}>
            <button>Sign In</button>
            <NavLink to='/signUp'><button>Sign Up</button></NavLink>
            </div>
        </div>
    )
}

export default SignIn