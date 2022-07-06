import { FC } from 'react'

import style from './Loader.module.css'

const Loader:FC = () => {
  return (
    <div className={style.lds_spinner}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  )
}

export default Loader