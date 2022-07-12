import { useState, useEffect} from 'react';
import './randomChar.scss';
import useMarvelServices from '../resources/MarvelServices';
import {setContent} from '../utils/setContent'
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = ()=> {
    const [char, setChar] = useState({});
    const {status, setStatus, getCharacter, clearError} = useMarvelServices();
    
    const onCharLoaded = (char)=>{

        const description = char.description ? 
            char.description.slice(0,210) +'...' :
            'There is no description for this character';
        setChar(()=> ({...char, description}));
    }
    
    const updateCharacter = ()=>{
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
            getCharacter(id)
                .then(onCharLoaded)
                .then(()=>setStatus('loaded'));
    }

    useEffect(()=>{
        updateCharacter();
    }, [])

    const randomChar = ()=>{
        setChar({});
        updateCharacter();
    }

        return (
            <div className="randomchar">
               
                {setContent(status, View, char)}

                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main"
                    onClick={randomChar}
                    disabled={status === 'loading'}>
                        <div className="inner">{status === 'loading' ? 'loading...' : 'try it'}</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    
}

const View = ({data})=>{
    
    const {name, description, thumbnail, homepage, wiki} = data;

    return(
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img"
            style={thumbnail.includes('not_available') ?
                {objectFit : 'contain'} :
                null} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr"> {description} </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;