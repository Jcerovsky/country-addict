import { PiStarAndCrescent } from "react-icons/pi";
import { useContext } from "react";
import { Context } from "../Context";
import { useNavigate } from "react-router-dom";

function Nav() {
  const context = useContext(Context);
  const navigate = useNavigate();

  const handleThemeChange = () => {
    context!.setTheme((prevState) => {
      return prevState === "light" ? "dark" : "light";
    });
  };

  return (
    <nav className="flex gap-2 p-5 shadow-lg sticky top-0  ">
      <h1 className="font-bold cursor-pointer" onClick={() => navigate("/")}>
        Where in the world?
      </h1>
      <div
        className="self-center ml-auto cursor-pointer flex gap-2 "
        onClick={handleThemeChange}
      >
        <span className="self-center ">
          <PiStarAndCrescent />
        </span>
        <p>Dark Mode</p>
      </div>
    </nav>
  );
}

export default Nav;
