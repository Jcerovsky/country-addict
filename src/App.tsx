import { PiMagnifyingGlass } from "react-icons/pi";
import { useEffect, useRef, useState } from "react";
import AllCountries from "./components/AllCountries";
import { AllCountriesProps } from "./Context";
import Nav from "./components/Nav";

function App() {
  const [allCountries, setAllCountries] = useState<
    AllCountriesProps[] | undefined
  >([]);
  const [filteredCountries, setFilteredCountries] = useState<
    AllCountriesProps[] | undefined
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAllCountries(data);
        setFilteredCountries(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputSearch = (value: string) => {
    if (value === "Filter by Region") {
      setFilteredCountries(allCountries);
    }

    setFilteredCountries(
      allCountries?.filter((country) =>
        country.name.common.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  const handleSelect = (value: string) => {
    if (inputRef.current?.value) {
      inputRef.current.value = "";
    }
    setFilteredCountries(
      allCountries?.filter(
        (country) => country.region.toLowerCase() === value.toLowerCase(),
      ),
    );
  };

  return (
    <div className="bg-zinc-100 dark:bg-slate-800 dark:text-white h-100 p-1">
      <Nav />
      <main className="m-4">
        <section>
          <div className="flex items-center justify-center gap-5 p-2 opacity-50 dark:opacity-100 shadow-md rounded-md bg-white dark:bg-slate-700">
            <PiMagnifyingGlass />
            <input
              type="text"
              placeholder="Search for a country..."
              className="p-2 outline-none dark:bg-slate-700"
              ref={inputRef}
              onChange={(e) => handleInputSearch(e.target.value)}
            />
          </div>
        </section>
        <section className="mt-10">
          <select
            className="p-4 shadow-md rounded-md dark:bg-slate-700"
            onChange={(e) => handleSelect(e.target.value)}
          >
            <option value="Filter by Region">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </section>
        <AllCountries filtered={filteredCountries} isLoading={isLoading} />
      </main>
    </div>
  );
}

export default App;
