import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelServices from '../resources/MarvelServices';
import {setContent} from '../utils/setContent';

import './charInfo.scss';


const CharInfo = (props)=> {
   
    const {charId} = props;
    const [char, setChar ] = useState(null)  
    const {status, setStatus, getCharacter, clearError} = useMarvelServices();

    const  updateCaracter = (id) => {
        clearError();
        getCharacter(id)
            .then(onCharLoaded)
            .then(()=>setStatus('loaded'));      
    }

    const onCharLoaded = (items)=>{
        setChar({...items});
    }
 
    const updateChar = () => {
        if(!charId) {
            return
        }
        updateCaracter(charId);
    }

    useEffect(()=>updateChar() , [charId])

        return (

            <div className="char__info">
                {setContent(status, View, char)}    
            </div>
        )
    
}

const View = ({data})=>{
    const {name, thumbnail, description, homepage, wiki, comics} = data;
    const style = thumbnail.indexOf('image_not_available') ? {objectFit : 'contain'} : null;
    const descr = description ? description : 'There is no description for this character';
    
    
   const comicsList = ()=>{   
        if(comics.length === 0 ){
            return(
                <li className="char__comics-item" >
                        There are no comics about this character now
                </li>
            )
        }else{
            return comics.map((item,i)=>{  
                const comicsId = item.resourceURI.substr(item.resourceURI.lastIndexOf('comics/'));

                if(i < 10){  
                    return(
                            <li className="char__comics-item" key={i}>
                                <Link to={comicsId}>{item.name}</Link>    
                            </li>  
                    )
                }
            })  
        }
    }
  
    return(
        <>
        <div className="char__basics">
                    <img src={thumbnail} alt={name} style={style}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {descr}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                   {comicsList()}
                   
                </ul>
        </>
    )
}

export default CharInfo;