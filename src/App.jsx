import './App.css'
import Search from "./components/Search.jsx";
import {useEffect, useState} from "react";
import Spinner from "./components/Spinner.jsx";

const API_BASE_URL = "https://api.themoviedb.org/3/";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`
    }
}

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const fetchMovies = async () => {
        setLoading(true);
        setErrorMessage('')

        try {
            const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

            const response = await fetch(endpoint, API_OPTIONS)

            if (!response.ok) {
                throw new Error("Failed to fetch movies");
            }

            const data = await response.json()

            if (data.Response === false){
                setErrorMessage(data.Error || 'Failed to fetch movies');
                setMovies([])
                return
            }

            setMovies(data.results || [])

        } catch (error) {
            console.log(`Error fetching movies: ${error}`);
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMovies()
    }, []);

    return (
        <main className="pattern">
            <div className="wrapper">
                <header>
                    <img src="/hero.png" alt=""/>
                    <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without Hassle</h1>

                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                </header>

                <section className="all-movies">

                    <h2 className="mt-[4 0px]">All Movies</h2>

                    { loading ? (
                        <Spinner/>
                    ) : errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ) : (
                        <ul>
                            {movies.map(movie => (
                                <p key={movie.id} className="text-white">{movie.title}</p>
                            ))}
                        </ul>
                    )}

                </section>

            </div>
        </main>
    )
}

export default App
