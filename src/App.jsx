import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router'
import './App.css'
import CrudWithRounting from './pages/CrudWithRounting'
import AddBlog from './pages/AddBlog';
import ShowBlog from './pages/ShowBlog';
import Edit from './pages/Edit';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<CrudWithRounting/>}/>
        <Route path='/AddBlog' element={<AddBlog/>}/>
        <Route path="/ShowBlog/:id" element={<ShowBlog/>}/>
        <Route path='/Edit/:id' element={<Edit/>}/>
        <Route path="/*" element={<h2>Not Found</h2>} />
      </Routes>
    </>
  )
}

export default App
