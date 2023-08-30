import { PiStarAndCrescent } from "react-icons/pi";
import { useContext } from "react";
import { Context } from "./src/Context";

function Nav() {
  const context = useContext(Context);

  const handleThemeChange = () => {
    console.log("clicked");
    context!.setTheme((prevState) => {
      console.log(prevState);
      return prevState === "light" ? "dark" : "light";
    });
  };

  return (
    <nav className="flex gap-2 p-5 shadow-lg">
      <h1 className="font-bold">Where in the world?</h1>
      <span className="self-center ml-auto" onClick={handleThemeChange}>
        <PiStarAndCrescent />
      </span>
      <p>Dark Mode</p>
    </nav>
  );
}

export default Nav;
