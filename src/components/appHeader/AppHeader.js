import {NavLink, Link, useMatch, useParams} from 'react-router-dom';
import './appHeader.scss';

const CustomLink=({children,to})=>{
    const {charId} = useParams();
    const match = useMatch(`/comics/*`)

    return (
        <Link to={`${to}/${charId ? charId : ''}`}
                style={{
                    color : match ? '#9f0013' : 'inherit'
                }}>
        {children}
        </Link>
    )
}

const AppHeader = () => {
    
    return (
        <header className="app__header">
            <h1 className="app__title">

                <Link to='/'>
                    <span>Marvel</span> information portal
                </Link>
               
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink 
                    end
                    style={({isActive})=>({color : isActive ? '#9f0013' : 'inherit'})}
                    to='/'
                    >Characters</NavLink></li>
                    /
                    <li>
                    <CustomLink to='/comics'>
                    Comics   
                    </CustomLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;