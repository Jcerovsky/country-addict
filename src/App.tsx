import { PiMagnifyingGlass } from "react-icons/pi";
import { useContext, useEffect, useRef, useState } from "react";
import AllCountries from "./components/AllCountries";
import { Context } from "./Context";
import Nav from "./components/Nav";
import ErrorMessage from "./components/ErrorMessage";
import Loading from "./components/Loading";

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
  }, [setAllCountries, setFilteredCountries, setErrMsg]);

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

  const sortCountriesBy = (filter: string) => {
    if (filter === "PopulationUp") {
      const sortedCountries = [...allCountries].sort(
        (a, b) => b.population - a.population,
      );
      setFilteredCountries(sortedCountries);
    } else if (filter === "PopulationDown") {
      const sortedCountries = [...allCountries].sort(
        (a, b) => a.population - b.population,
      );
      setFilteredCountries(sortedCountries);
    } else if (filter === "NameInOrder") {
      const sortedCountries = [...allCountries].sort((a, b) =>
        a.name.common.localeCompare(b.name.common),
      );
      setFilteredCountries(sortedCountries);
    } else if (filter === "NameInReverseOrder") {
      const sortedCountries = [...allCountries].sort((a, b) =>
        b.name.common.localeCompare(a.name.common),
      );
      setFilteredCountries(sortedCountries);
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="h-screen dark:bg-slate-800 bg-zinc-100">
      <div className="bg-zinc-100 dark:bg-slate-800 dark:text-white ">
        <Nav />
        {errMsg && <ErrorMessage />}
        <main className="m-4 smTablet:mt-0">
          <div className="smTablet:flex flex-wrap justify-between smTablet:items-center smTablet:mt-5 smTablet:gap-4">
            <div className="flex items-center justify-center gap-3 p-2 opacity-50 dark:opacity-100 shadow-md rounded-md bg-white dark:bg-slate-700">
              <PiMagnifyingGlass />
              <input
                type="text"
                placeholder="Search for a country..."
                className="p-2 outline-none dark:bg-slate-700 cursor-pointer"
                ref={inputRef}
                onChange={(e) => handleInputSearch(e.target.value)}
              />
            </div>
            <select
              className="p-4 shadow-md rounded-md dark:bg-slate-700 mt-4 smTablet:mt-0 tablet:ml-auto mr-2 cursor-pointer"
              onChange={(e) => handleSelectRegion(e.target.value)}
            >
              <option value="Filter by Region">Filter by Region</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>

            <select
              className="p-4 shadow-md rounded-md dark:bg-slate-700 mt-4 smTablet:mt-0 cursor-pointer"
              onChange={(e) => sortCountriesBy(e.target.value)}
            >
              <option value="Sort by">Sort by</option>
              <option value="PopulationUp">Population ↑</option>
              <option value="PopulationDown">Population ↓</option>
              <option value="NameInOrder">Name ↑</option>
              <option value="NameInReverseOrder">Name ↓</option>
            </select>
          </div>
          {filteredCountries.length === 0 ? (
            <div className="h-screen dark:bg-slate-800 bg-zinc-100">
              <div className="mt-5 text-center bg-slate-300 rounded-md p-2 text-black">
                <h1>No countries match your description</h1>
              </div>
            </div>
          ) : (
            <AllCountries />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
