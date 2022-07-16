import { Carousel, Slider } from 'antd'
import { FC } from 'react'
import style from './Guest.module.css'


const Guest:FC = () => {
    return (
        <Carousel autoplay className={style.carousel}>
        <div className={style.item1}>
        </div>
        <div className={style.item2}>
        </div>
        <div className={style.item3}>
        </div>
      </Carousel>
    );
}

export default Guest