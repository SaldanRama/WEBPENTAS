import {Routes, Route} from "react-router-dom";

import { NavbarComponents } from "./components/NavbarComponents";

import { HomePage } from "./pages/HomePage";
import { DetailFasilitas } from "./pages/DetailFasilitas";


function App() {
  return (
    <div>
      <NavbarComponents/>

      <Routes>
        <Route path="/" Component={HomePage}/>
        <Route path="/detailfasilitas" Component={DetailFasilitas}/>
      </Routes>


    </div>

  )
}

export default App
