
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Components/Layout'
import List from './Components/List'
import MovieDetail from './Components/MovieDetail.'
import FavoritesList from './Components/Favorites'



function App() {
  
  
  
  


  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element = {<Layout/>}>
       <Route index element = {<List/>}/>
       <Route path='movie/:id' element= {<MovieDetail/>}/>
       <Route path='favorites' element= {<FavoritesList/>}/>
      </Route>
      
     
    </Routes>
   </BrowserRouter>
  )
}

export default App
