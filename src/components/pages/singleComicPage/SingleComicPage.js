import { useParams, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import useMarvelServices from '../../resources/MarvelServices';
import AppBanner from '../../appBanner/AppBanner';
import { setContent } from '../../utils/setContent';
import './singleComicPage.scss';


const SingleComicPage = () => {
    const [comic, setComic] = useState(null);
    const {comicId} = useParams();
    const {status, setStatus, clearError, getComic, getCharacter} = useMarvelServices();


    const loadingComic = (id)=>{
        
        if(comicId.length === 7){
            getCharacter(id)
                .then(setComic)
                .then(()=>setStatus('loaded'));
        }
        else{
            getComic(id)
                .then(setComic)
                .then(()=>setStatus('loaded'));
        }
    }
    
    useEffect(()=>{
        clearError();
        loadingComic(comicId)
    },[comicId]);

    return (
        <>
        <AppBanner/>
        {setContent(status, View, comic)}
        </>
    )
}

const View = ({data})=>{
    const { description, language, pageCount, price, thumbnail, name} = data;
    const navigate = useNavigate(),
        goBack = ()=> navigate(-1);

    return(
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">{language ? `Language: ${language}` : null}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <button onClick={goBack} className="single-comic__back">Get back</button>
        </div>
    )
}

export default SingleComicPage;

