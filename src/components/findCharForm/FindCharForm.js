import useMarvelServices from '../resources/MarvelServices';
import { Link } from 'react-router-dom';
import {  useState} from 'react';
import { useFormik, Field, Form, ErrorMessage, useField, Formik } from 'formik';
import * as Yup from 'yup';
import { setContentForm } from '../utils/setContent';
import './findCharForm.scss';


const FindCharForm  = ()=>{
    
    const {getCharName, status, setStatus} = useMarvelServices();
    const [char, setChar] = useState();
    
    const getChar = (charName)=>{
        getCharName(charName)
         .then(setChar)
         .then(()=>setStatus('loaded'));
    }
   
    const formik = useFormik({
        initialValues : {
            charName : ''
        },
        validationSchema : Yup.object({
            charName : Yup.string('you can only enter letters')
            .min(3, 'Minimum 3 characters to fill')
            .max(20, 'maximum 20 characters to fill')
            .required('The field is required')
        }),
        onSubmit : value =>getChar(value.charName)

        
    })
    
    return(       
            <div className="char__search-form">
                <form  onSubmit={formik.handleSubmit}>
                <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                <div className="char__search-wrapper">
                    <input
                        id="charName" 
                        name='charName' 
                        type='text' 
                        placeholder="Enter name"
                        onChange={formik.handleChange}
                        value={formik.values.charName}
                        onBlur={formik.handleChange}
                        />
                    <button 
                        type='submit' 
                        className="button button__main"
                        disabled={status === 'loading'}>
                        
                        <div className="inner">{status === 'loading' ? 'loading...' : 'find'}</div>
                    </button>
                </div>
                {formik.errors.charName && formik.touched.charName?
                    <div className='char__search-error'>{formik.errors.charName}</div> :
                    setContentForm(status,ViewChar, char )}  
            </form>       
        </div>  
    )
}
const ViewChar = ({data})=>{

    return(
        <div className='char__search-wrapper'>
            <div className='char__search-success'>{`There is! Visit ${data.name}, page?`}</div>
            <Link to={`comics/${data.id}`}>
                <button className='button button__secondary'>
                    <div className='inner'>to page</div>
                </button>
            </Link>
        </div>
    )
}


export default FindCharForm;