import './Main.css'
import Sidebar from './sidebar(left)/Sidebar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Messages from './Messages/Messages'
import Options from './Options/Options'
import News from './News/News'
import Groups from './Groups/Groups'
import Games from './Games/Games'
import Content from './Profile/content'


let Main = (props) => {
    return (
        <BrowserRouter>
            <main>
                <Sidebar />
                <div className='content'>
                    <Routes>
                        <Route path='/Profile' element={ <Content post={props.post}/>} />
                        <Route path='/Messages' element={<Messages message={props.message} dialogs={props.dialogs} />} />
                        <Route path='/Options' element={<Options />} />
                        <Route path='/News' element={<News />} />
                        <Route path='/Groups' element={<Groups />} />
                        <Route path='/Games' element={<Games />} />
                    </Routes>

                </div>
            </main>
        </BrowserRouter>
    )
}

export default Main