import style from './Loader.module.css'

const Loader = () => {
    return (
        <div class={style.lds_spinner}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    )
}

export default Loader