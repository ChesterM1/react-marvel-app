import './comicsList.scss';
import { Link } from 'react-router-dom';
import useMarvelServices from '../resources/MarvelServices';
import { useState, useEffect } from 'react';
import {setContentWithLoad} from '../utils/setContent';
import { CSSTransition, TransitionGroup } from 'react-transition-group';



const ComicsList = () => {

    const {getComics, setStatus, status} = useMarvelServices();
    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(500);
    const [newComicsLoad, setNewComicsLoad] = useState(false);
    
    const loadComics = (offset)=>{   
        getComics(offset)
            .then(onComicsLoaded)
            .then(()=>setStatus('loaded'));
        updateOffset();
    }
    
    const onComicsLoaded = (items)=>{
        
        setComics([...comics , ...items]);
        setNewComicsLoad(false);

    }

    const  updateOffset = ()=>{
        setOffset(offset => offset+8)
    }
    
    const  loadMoreComics = () =>{
        
        setNewComicsLoad(true)
        loadComics(offset);

    }

    useEffect(()=>{
        loadComics(offset)
    },[]);

    const createComics = ()=>{
        const items = comics.map((item, i)=>{

            return(
                <CSSTransition
                    timeout={Math.floor(Math.random() * (700 - 100)) + 100}
                    classNames={'comics__item'}
                    key={i}>
                <li className="comics__item" key={i} tabIndex={0}>
                        <Link to={`/comics/${item.id}`}>
                            <img src={item.thumbnail} alt="ultimate war" className="comics__item-img" />
                            <div className="comics__item-name">{item.name}</div>
                            <div className="comics__item-price">{item.price}</div>
                        </Link>
                    </li>
                       </CSSTransition>
            )
        });
        return(
            <ul className="comics__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        ) 
    }
   
    return (
        <div className="comics__list">

            {setContentWithLoad(status, ()=>createComics(), newComicsLoad)}   

            <button className="button button__main button__long"
                disabled={newComicsLoad}
                onClick={loadMoreComics}>
                <div className="inner">
                {newComicsLoad ? 'Loading...' : 'load more' }</div>
            </button>
        </div>
    )
}

export default ComicsList;