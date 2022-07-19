import { FC, PropsWithChildren, useEffect, useState } from 'react'
import style from './Slider.module.css'

type SliderProps = PropsWithChildren<{

  }>;

const Slider:FC<SliderProps> = ({children}) => {

const [item,setItem] = useState()
const [offset,setOffset] = useState(0)

useEffect(() => {

},[])

    return (
     <div className={style.window}>
        <div className={style.itemContainer}>
            {children}
        </div>
     </div>
    )
}

export default Slider