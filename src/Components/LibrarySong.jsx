import React from "react";

const LibrarySong = ({
  currentSong,
  setCurrentSong,
  songs,
  setSongs,
  audioRef,
  isPlaying,
}) => {
  //events handlers
  const handleSelectedSong = async () => {
    await setCurrentSong(currentSong);
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
        return { ...song, active: true };
      } else {
        return { ...song, active: false };
      }
    });
    setSongs(newSongs);
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div
      className={`library-song ${currentSong.active ? "selected" : ""}`}
      onClick={handleSelectedSong}
    >
      <img src={currentSong.cover} alt="" />
      <div className="song-description">
        <h3>{currentSong.name}</h3>
        <h4>{currentSong.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
