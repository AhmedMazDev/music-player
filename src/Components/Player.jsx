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
  currentSong,
  audioRef,
  currentSongInfo,
  isPlaying,
  setIsPlaying,
  setCurrentSongInfo,
}) => {
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

  //helpers functions
  const getTime = (seconds) => {
    return (
      Math.floor(seconds / 60) +
      ":" +
      ("0" + Math.floor(seconds % 60)).slice(-2)
    );
  };

  return (
    <div className="player">
      <div className="player-timeline">
        <p>{getTime(currentSongInfo.currentTime)}</p>
        <input
          type="range"
          min="0"
          value={currentSongInfo.currentTime}
          onChange={handleChange}
          max={currentSongInfo.duration}
        />
        <p>{getTime(currentSongInfo.duration)}</p>
      </div>
      <div className="player-controls">
        <FontAwesomeIcon size="2x" icon={faChevronLeft} />
        <FontAwesomeIcon
          size="2x"
          icon={isPlaying ? faPause : faPlay}
          onClick={handlePlay}
        />
        <FontAwesomeIcon size="2x" icon={faChevronRight} />
      </div>
    </div>
  );
};

export default Player;
