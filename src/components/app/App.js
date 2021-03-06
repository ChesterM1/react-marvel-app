import {lazy, Suspense} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AppHeader from "../appHeader/AppHeader";
import { ComicsPage, MainPage, SingleComicPage } from '../pages';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import Spinner from '../spinner/Spinner';

const Page404 = lazy(()=> import('../pages/404'));





const App = ()=>{
    
    

    return (
            <Router>
                <div className="app">
                <AppHeader/>
                    <Suspense fallback={<Spinner/>}>

                        <main>
                        <Routes>
                            <Route path='/' element={<MainPage/>}/>
                            <Route path='/comics' element={<ComicsPage/>}/>
                            <Route path='/comics/:comicId' element={<ErrorBoundary><SingleComicPage/></ErrorBoundary>}/>
                            <Route path='*' element={<Page404/>}/>
                            
                        </Routes>
                        </main>
                    </Suspense>
                </div>
            </Router>
      
       
    )
    
}



export default App;