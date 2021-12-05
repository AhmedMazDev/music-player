import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({ songs, libraryStatus }) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h1>Library</h1>
      {songs.map((song) => (
        <LibrarySong currentSong={song} key={song.id} />
      ))}
    </div>
  );
};

export default Library;
