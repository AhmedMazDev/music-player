import React, { useEffect } from "react";
//imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  songs,
  setSongs,
  setCurrentSong,
  currentSong,
  audioRef,
  currentSongInfo,
  isPlaying,
  setIsPlaying,
  setCurrentSongInfo,
}) => {
  useEffect(() => {
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
        return { ...song, active: true };
      } else {
        return { ...song, active: false };
      }
    });
    setSongs(newSongs);
  }, [currentSong]);

  //events handlers
  const handlePlay = () => {
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const handleChange = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentSongInfo({ ...setCurrentSongInfo, currentTime: e.target.value });
  };

  const handleSkipClick = async (direction) => {
    let index = songs.findIndex((song) => song.active);
    if (direction === "right") {
      index = (index + 1) % songs.length;
    }
    if (direction === "left") {
      if ((index - 1) % songs.length === -1) {
        index = songs.length - 1;
      } else {
        index = (index - 1) % songs.length;
      }
    }
    await setCurrentSong(songs[index]);
    if (isPlaying) audioRef.current.play();
  };

  //helpers functions
  const getTime = (seconds) => {
    return (
      Math.floor(seconds / 60) +
      ":" +
      ("0" + Math.floor(seconds % 60)).slice(-2)
    );
  };

  //style input
  const trackAnim = {
    transform: `translateX(${currentSongInfo.animationPercentage}%)`,
  };

  return (
    <div className="player">
      <div className="player-timeline">
        <p>{getTime(currentSongInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            type="range"
            min="0"
            value={currentSongInfo.currentTime}
            onChange={handleChange}
            max={currentSongInfo.duration || 0}
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>
          {currentSongInfo.duration
            ? getTime(currentSongInfo.duration)
            : "0:00"}
        </p>
      </div>
      <div className="player-controls">
        <FontAwesomeIcon
          size="2x"
          icon={faChevronLeft}
          onClick={() => handleSkipClick("left")}
        />
        <FontAwesomeIcon
          size="2x"
          icon={isPlaying ? faPause : faPlay}
          onClick={handlePlay}
        />
        <FontAwesomeIcon
          size="2x"
          icon={faChevronRight}
          onClick={() => handleSkipClick("right")}
        />
      </div>
    </div>
  );
};

export default Player;
