import React from "react";

const LibrarySong = ({ currentSong }) => {
  return (
    <div className="library-song">
      <img src={currentSong.cover} alt="" />
      <div className="song-description">
        <h3>{currentSong.name}</h3>
        <h4>{currentSong.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
