import { PiMagnifyingGlass } from "react-icons/pi";
import { useContext, useEffect, useRef, useState } from "react";
import AllCountries from "./components/AllCountries";
import { Context } from "./Context";
import Nav from "./components/Nav";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const {
    setAllCountries,
    setFilteredCountries,
    allCountries,
    filteredCountries,
    setErrMsg,
    errMsg,
  } = useContext(Context)!;

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setAllCountries(data);
        setFilteredCountries(data);
        setIsLoading(false);
      })
      .catch((err) => setErrMsg(err));
  }, []);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputSearch = (value: string) => {
    if (selectedRegion) {
      setFilteredCountries(
        allCountries.filter(
          (country) =>
            country.region.toLowerCase() === selectedRegion &&
            country.name.common.toLowerCase().includes(value.toLowerCase()),
        ),
      );
    } else {
      setFilteredCountries(
        allCountries.filter((country) =>
          country.name.common.toLowerCase().includes(value.toLowerCase()),
        ),
      );
    }
  };

  const handleSelectRegion = (region: string) => {
    if (inputRef.current?.value) {
      inputRef.current.value = "";
    }

    if (region === "Filter by Region") {
      setFilteredCountries(allCountries);
      setSelectedRegion("");
    } else {
      setSelectedRegion(region.toLowerCase());

      setFilteredCountries(
        allCountries?.filter(
          (country) => country.region.toLowerCase() === region.toLowerCase(),
        ),
      );
    }
  };

  return (
    <div className="bg-zinc-100 dark:bg-slate-800 dark:text-white ">
      <Nav />
      {errMsg && <ErrorMessage />}
      <main className="m-4">
        <div className="smTablet:flex justify-between smTablet:items-center">
          <div className="flex items-center  justify-center gap-5 p-2 opacity-50 dark:opacity-100 shadow-md rounded-md bg-white dark:bg-slate-700">
            <PiMagnifyingGlass />
            <input
              type="text"
              placeholder="Search for a country..."
              className="p-2 outline-none dark:bg-slate-700"
              ref={inputRef}
              onChange={(e) => handleInputSearch(e.target.value)}
            />
          </div>
          <select
            className="p-4 shadow-md rounded-md dark:bg-slate-700 smTablet:self-center mt-10"
            onChange={(e) => handleSelectRegion(e.target.value)}
          >
            <option value="Filter by Region">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
        {filteredCountries.length === 0 ? (
          <div className="h-screen dark:bg-slate-800 bg-zinc-100">
            <div className="mt-5 text-center bg-slate-300 rounded-md p-2 text-black">
              <h1>No countries match your description</h1>
            </div>
          </div>
        ) : (
          <AllCountries isLoading={isLoading} />
        )}
      </main>
    </div>
  );
}

export default App;
