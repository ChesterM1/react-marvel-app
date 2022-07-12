import img from './error.gif';
import './errorMessage.scss';

const ErrorMessage = ()=>{
    return(
        <img src={img} alt='error loading'/>
    )
}

export default ErrorMessage;