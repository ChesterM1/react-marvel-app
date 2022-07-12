/* eslint-disable no-fallthrough */
import Spinner from "../spinner/Spinner";
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from "../errorMessage/ErrorMessage";


const setContent = (status, Component, data)=>{
    switch(status){
        case 'pending' : 
            return <Skeleton/>;
        case 'loading' : 
            return <Spinner/>;
        case 'loaded' :
           return <Component data={data}/>;
        case 'error' :
           return <ErrorMessage/>;
        default :
            throw  new Error('Unexpected status state ');
    }
}

const setContentWithLoad = (status, Component, firstLoad)=>{
    switch(status){
        case 'pending' : 
            return <Spinner/>;
        case 'loading' : 
            return !firstLoad ? <Spinner/> : <Component/>;
        case 'loaded' :
           return <Component />;
        case 'error' :
           return <ErrorMessage/>;
        default :
            throw  new Error('Unexpected status state ');
    }
}

const setContentForm = (status, Component, data)=>{
   
    switch(status){
        case 'pending' : 
            return null;
        case 'loading' : 
            return true;
        case 'loaded' :
           return data ? <Component data={data}/> : (<div className='char__search-error'>This character was not found. Check the name and try again</div>);
        case 'error' :
            return <ErrorMessage/>;
        default :
             throw  new Error('Unexpected status state ');
    }
}

export {setContent, setContentWithLoad, setContentForm};