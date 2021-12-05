import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const NavBar = ({ libraryStatus, setLibraryStatus }) => {
  //events handlers
  const handleLibrary = () => {
    setLibraryStatus(!libraryStatus);
  };

  return (
    <nav>
      <h1>Music App</h1>
      <button onClick={handleLibrary}>
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};

export default NavBar;
