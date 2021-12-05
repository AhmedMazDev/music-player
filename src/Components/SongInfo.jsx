import React from "react";

const SongInfo = ({ currentSong }) => {
  return (
    <div className="song-info">
      <img src={currentSong.cover} alt="" />
      <h1>{currentSong.name}</h1>
      <h2>{currentSong.artist}</h2>
    </div>
  );
};

export default SongInfo;
