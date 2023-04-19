import './App.css';
import { useState, useEffect } from "react";
import { Auth } from "./components/Auth";
import { db } from "./config/firebase";
import { getDocs, collection, addDoc, deleteDoc, doc } from "firebase/firestore";

function App() {

  const [movielist, setMovieList] = useState([]);

  //New movies store
  const [newMovieName, setNewMovieName] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [newMovieOscer, setNewMovieOscer] = useState(false);

  const movieCollectionRef = collection(db, "movies");


  //After Submit 
  const onSubmitMovie = async () => {
      try{
        await addDoc(movieCollectionRef,{
        title:newMovieName,
        releaseYear:newReleaseDate,
        wonAnOscar:newMovieOscer
      });
      getMovieList();

    }catch(err){
       console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMovieList();
  };
  const getMovieList = async () => {
    //READ THE DATA 
    //SET THE DATA
    try {
      const data = await getDocs(movieCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filteredData);
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getMovieList();

  }, []);



  return (
    <div className="App">
      <Auth />
      <div>
        <input placeholder='Movie Name...' onChange={(e) => setNewMovieName(e.target.value)}/>
        <input placeholder='Released Year...' type='number' onChange={(e) => setNewReleaseDate(e.target.value)}/>
        <input type="checkbox" checked={newMovieOscer} onChange={(e) => setNewMovieOscer(e.target.checked)} />
        <label>Recived an oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>
      <div>
        {movielist.map((movie) => (
          <div>
            <h1 style={{color: movie.wonAnOscar ? "green" :"red"}}>
              {movie.title}
              </h1>
            <p>Data : {movie.releaseYear}</p>
            <button onClick={()=> deleteMovie(movie.id)}>Delete</button>
          </div>
        )
        )}
      </div>
    </div>
  );
}

export default App;

