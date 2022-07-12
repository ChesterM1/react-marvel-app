import { useHttp } from "../hooks/http.hooks";


const useMarvelServices = ()=> {
    const { request, clearError, status, setStatus} = useHttp();

    const  _apiBase = 'https://gateway.marvel.com:443/v1/public';
   const _apiKey = 'apikey=9a5bf1eca6a1ca940d27f596d7db8582';
    // const _apiKey = 'apikey=37400d11c6cd805ae7298e1edc5823f9';
 //   https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=210&apikey=37400d11c6cd805ae7298e1edc5823f9


    const getAllCharacters = async (offset) => {
       const res = await request(`${_apiBase}/characters?limit=9&offset=${offset}&${_apiKey}`);
       return res.data.results.map(_tratsformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await  request(`${_apiBase}/characters/${id}?${_apiKey}`);
        return _tratsformCharacter(res.data.results[0]);
     }

    const getComics = async (offset = 0)=>{
        const res = await request(`${_apiBase}/comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_comicsTransform);
    }

    const getComic = async (id = 777)=>{ 
        const res = await request(`${_apiBase}/comics/${id}?${_apiKey}`);
        return _comicsTransform(res.data.results[0]);
    }

    const getCharName = async (name)=>{
        const res = await request(`${_apiBase}/characters?name=${name}&${_apiKey}`);
        if(res.data.total < 1) return setStatus('error');
        return _transformCharName(res.data.results[0]);
    }

    const _transformCharName = (char) =>{
        return {
            id : char.id,
            name : char.name,
            description : char.description || 'There is no description',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
        }
    }
    
    const _comicsTransform = (comics)=>{
        return {   
            id: comics.id,
            name: comics.title,
            price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            description : comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            language: comics.textObjects.language || 'en-us',

        }
    }

    const _tratsformCharacter = (char) =>{
    
        return{
            id: char.id,
            name: char.name,
            description: char.description || 'There is no description for this character',
            thumbnail: char.thumbnail.path +'.'+ char.thumbnail.extension ,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics : char.comics.items
        }
     }

     return {
            status, 
            setStatus, 
            getCharacter, 
            getAllCharacters, 
            clearError, 
            getComics, 
            getComic, 
            getCharName}
}
export default useMarvelServices;