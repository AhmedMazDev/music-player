import { useRef, useState } from "react";
//Importing Components
import Player from "./Components/Player";
import SongInfo from "./Components/SongInfo";
import getSongs from "./Data";
import NavBar from "./Components/NavBar";
//Styles
import "./styles/app.scss";

function App() {
  //state
  const [songs, setSongs] = useState(getSongs());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [currentSongInfo, setCurrentSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [isPlaying, setIsPlaying] = useState(false);

  //refs
  const audioRef = useRef();

  //events handlers
  const handleTimeUpdate = (e) => {
    setCurrentSongInfo({
      ...setCurrentSongInfo,
      currentTime: e.target.currentTime,
      duration: e.target.duration,
    });
  };

  return (
    <div className="App">
      <NavBar />
      <SongInfo currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        audioRef={audioRef}
        currentSongInfo={currentSongInfo}
        setCurrentSongInfo={setCurrentSongInfo}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <audio
        src={currentSong.audio}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        ref={audioRef}
      ></audio>
    </div>
  );
}

export default App;
