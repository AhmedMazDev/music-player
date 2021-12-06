import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  libraryStatus,
  setSongs,
  setCurrentSong,
  audioRef,
  isPlaying,
}) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h1>Library</h1>
      {songs.map((song) => (
        <LibrarySong
          audioRef={audioRef}
          isPlaying={isPlaying}
          songs={songs}
          setSongs={setSongs}
          setCurrentSong={setCurrentSong}
          currentSong={song}
          key={song.id}
        />
      ))}
    </div>
  );
};

export default Library;
