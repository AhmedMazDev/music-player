import { useRef, useState } from "react";
//Importing Components
import Player from "./Components/Player";
import SongInfo from "./Components/SongInfo";
import getSongs from "./Data";
import NavBar from "./Components/NavBar";
import Library from "./Components/Library";
//Styles
import "./styles/app.scss";

function App() {
  //state
  const [songs, setSongs] = useState(getSongs());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [currentSongInfo, setCurrentSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);

  //refs
  const audioRef = useRef();

  //events handlers
  const handleTimeUpdate = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    //Calculate percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);

    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    setCurrentSongInfo({
      ...setCurrentSongInfo,
      currentTime: current,
      duration: duration,
      animationPercentage: animation,
    });
  };

  const handleSongEnd = async () => {
    let index = songs.findIndex((song) => song.active);
    index = (index + 1) % songs.length;
    await setCurrentSong(songs[index]);
    audioRef.current.play();
  };

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <NavBar
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
      />
      <SongInfo currentSong={currentSong} />
      <Player
        songs={songs}
        setSongs={setSongs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        currentSongInfo={currentSongInfo}
        setCurrentSongInfo={setCurrentSongInfo}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <Library
        audioRef={audioRef}
        isPlaying={isPlaying}
        songs={songs}
        setSongs={setSongs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        libraryStatus={libraryStatus}
      />
      <audio
        src={currentSong.audio}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={handleSongEnd}
        ref={audioRef}
      ></audio>
    </div>
  );
}

export default App;
