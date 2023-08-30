import { PiMagnifyingGlass } from "react-icons/pi";
import { useEffect, useRef, useState } from "react";
import AllCountries from "../AllCountries";
import { AllCountriesProps } from "./Context";
import Nav from "../Nav";

function App() {
  const [allCountries, setAllCountries] = useState<
    AllCountriesProps[] | undefined
  >([]);
  const [filtered, setFiltered] = useState<AllCountriesProps[] | undefined>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setAllCountries(data);
        setFiltered(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = (e: string) => {
    if (e === "Filter by Region") {
      setFiltered(allCountries);
    }

    setFiltered(
      allCountries?.filter((country) =>
        country.name.common.toLowerCase().includes(e.toLowerCase()),
      ),
    );
  };

  const handleSelect = (e: string) => {
    if (inputRef.current?.value) {
      inputRef.current.value = "";
    }
    setFiltered(
      allCountries?.filter(
        (country) => country.region.toLowerCase() === e.toLowerCase(),
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
              onChange={(e) => handleSearch(e.target.value)}
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
        <AllCountries filtered={filtered} isLoading={isLoading} />
      </main>
    </div>
  );
}

export default App;
