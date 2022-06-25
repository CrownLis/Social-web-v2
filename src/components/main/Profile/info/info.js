import infoCss from './info.module.css'

let Info = (props) => {
return (
<div className={infoCss.info}>
<h2>Обо мне</h2>
    <span>Возраст: {props.age}</span> <br></br>
    <span>Увлечение: {props.lovely}</span><br></br>
    <span>Качества: {props.quality}</span><br></br>
    <span>Город: {props.locate} </span>
</div>

)
}

export default Info