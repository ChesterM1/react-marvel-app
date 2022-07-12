import { useState, useEffect, useRef, useMemo } from 'react';
import React from 'react';
import useMarvelServices from '../resources/MarvelServices';
import PropTypes from 'prop-types';
import {setContentWithLoad} from '../utils/setContent';
import './charList.scss';


const CharList = (props)=> {

    const listCharRef = useRef([]);
    const [charList, setCharList] = useState([]);
    const [offset, setOffset] = useState(260);
    const [charEnded, setCharEnded] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const {status, setStatus, getAllCharacters} = useMarvelServices();

    const focusChar = (id)=>{
            listCharRef.current.forEach(item => item.classList.remove('char__item_selected'));
            listCharRef.current[id].classList.add('char__item_selected');
            listCharRef.current[id].focus();
        }
    
    

    const onCharLoaded = (items)=>{
        let ended = false;
        if(items.length < 9 ){
            ended = true;
        }
        setCharList(()=>[ ...charList , ...items]);
        setNewItemLoading(false);
        setCharEnded(ended);
    }

    const updateOffset = ()=>{
        setOffset(offset=>offset + 9 );
        
    }

    const updateCaracter = (offset, initial ) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharLoaded)
            .then(()=>setStatus('loaded'))
        updateOffset();
    }  

    const loadMoreCaracter = ()=>{
        updateOffset();
        updateCaracter(offset);
    }
    
    useEffect(()=>{
        updateCaracter(offset, true);
    }, []);
    

    const createCharacters = (charList)=>{  
        const items =  charList.map((item, i)=>{
                
            let charStyle = {'objectFit' : 'cover'};
            if( item.thumbnail.indexOf('image_not_available') !== -1 ){
                charStyle = {objectFit : 'unset'}
           }

            return(
                        <li className="char__item"
                            tabIndex={i}
                            key={item.id}
                            onClick={()=>{
                                props.charId(item.id);
                                focusChar(i);
                            }}
                            onKeyPress={(e)=>{
                                if(e.key === 'Enter'){
                                    props.charId(item.id);
                                    focusChar(i);
                                }
                            }}
                            ref={ el => listCharRef.current[i] = el } >
                            <img src={item.thumbnail} alt={item.name} style={charStyle}/>
                            <div className="char__name">{item.name}</div>
                        </li>
            )    
        })
        return(
            
                <ul className="char__grid" >
                        {items}   
                </ul> 
            )  
    }
    
    const elements = useMemo(()=>{
       return setContentWithLoad(status,()=> createCharacters(charList), newItemLoading )
    }, [status] );
        return (        
                <div className="char__list">   
                    {elements}
                    <button className="button button__main button__long"
                        onClick={loadMoreCaracter}
                        disabled={newItemLoading}
                        style={{'display': charEnded ? 'none' : 'block'}}>
                        <div className="inner">{newItemLoading ? 'Loading...' : 'Load more'}</div>
                    </button>
                </div>
                
        )
    
}

CharList.propTypes = {
    charId : PropTypes.func
}

export default CharList;