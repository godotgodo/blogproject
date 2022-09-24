import './App.css';
import AppBar from './components/AppBar/AppBar.jsx';
import Blog from './components/Blog/Blog';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import BlogModal from './components/BlogModal/BlogModal.jsx';
import { useEffect } from 'react';
import { useState } from 'react';
import datamiz from './api/db.json';

function App() {
  const [data, setData] = useState([]);
  useEffect(()=>{
  setData(datamiz);
  },[]);
  
  // // Get data
  // useEffect(() => {
  //   (async () => {
  //     const gelendata = await (await fetch('/api/db.json')).json();
  //     setData(gelendata);
  //   })()
  // }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <AppBar />
        <Routes>
          <Route path='/' element={<h1>home</h1>} />
          <Route path='/contact' element={<h1>contact</h1>} />
          <Route path='/blog' element={<Blog data={data}/>} >
            <Route path='/blog/:title' element={<BlogModal data={data} />} />
          </Route>

        </Routes>
      </div>
    </BrowserRouter >
  );
}

export default App;
