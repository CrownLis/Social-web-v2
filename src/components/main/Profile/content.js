import ContentCss from './content.module.css'
import Avatar from './../../../img/avatar.jpg'
import React from "react";
import Posts from './posts/posts';
import Info from './info/info';

let Content = (props) => {
    return (
        
<div className={ContentCss.content}>
<div id={ContentCss.avatar}><img src={Avatar} alt='my avatar'></img></div>
<div id={ContentCss.name}>Жмышенко Валерий Альбертович</div>
<div id={ContentCss.upload}>
<button>Загрузить аватар</button>
</div>
<Info age='21' lovely='Одинокие женщины с детьми' locate='Санкт-Петербург' quality='Пошлый'/>
<Posts post={props.post}/>
</div>
    )
}
export default Content