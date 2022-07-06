import { FC } from 'react'

import style from './SignUp.module.css'

const SignUp:FC = () => {
    return (
    <div>
        <form className={style.container}>
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' name='name'/>
            <label htmlFor='secondName'>Second name</label>
            <input type='text' id='secondName' />
            <label htmlFor='email'>Email</label>
            <input type='text' id='email' />
            <label htmlFor='password'>Password</label>
            <input type='text' id='password' />
            <label htmlFor='confirm'>Confirm password</label>
            <input type='text' id='confirm' />
            <div className={style.checkbox}>
            <label htmlFor='checkbox'>I agree<span className={style.underline}> to the privacy policy</span></label>
            <input type='checkbox' id='checkbox'/>
            </div>
            <button type='submit'>Sign Up</button>
        </form>
    </div>
    )
}

export default SignUp