import './App.css'
import Search from "./components/Search.jsx";
import {useState} from "react";

function App() {

    const [searchTerm, setSearchTerm] = useState('');


  return (
      <main className="pattern">
         <div className="wrapper">
             <header>
                 <img src="/hero.png" alt=""/>
                 <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without Hassle</h1>
             </header>

             <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
         </div>
      </main>
  )
}

export default App
