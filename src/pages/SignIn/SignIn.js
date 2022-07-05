import { NavLink } from 'react-router-dom'
import style from './SignIn.module.css'

const SignIn = () => {
    return (
        <div>
        <form className={style.container}>
            <label for='login'>Login</label>
            <input id='login'></input>
            <label for='password'>Password</label>
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