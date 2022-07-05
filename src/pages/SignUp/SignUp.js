import style from './SignUp.module.css'

const SignUp = () => {
    return (
    <div>
        <form className={style.container}>
            <label for='name'>Name</label>
            <input type='text' id='name' name='name'/>
            <label for='secondName'>Second name</label>
            <input type='text' id='secondName' />
            <label for='email'>Email</label>
            <input type='text' id='email' />
            <label for='password'>Password</label>
            <input type='text' id='password' />
            <label for='confirm'>Confirm password</label>
            <input type='text' id='confirm' />
            <div className={style.checkbox}>
            <label for='checkbox'>I agree<span className={style.underline}> to the privacy policy</span></label>
            <input type='checkbox' id='checkbox'/>
            </div>
            <button type='submit'>Sign Up</button>
        </form>
    </div>
    )
}

export default SignUp