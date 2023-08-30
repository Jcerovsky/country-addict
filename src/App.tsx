import { PiStarAndCrescent, PiMagnifyingGlass } from "react-icons/pi";
import { useEffect, useRef, useState } from "react";

interface AllCountriesProps {
  capital: string | string[];
  flags: {
    png: string;
  };
  name: {
    common: string;
  };
  population: number;
  region: string;
}

function App() {
  const [allCountries, setAllCountries] = useState<
    AllCountriesProps[] | undefined
  >([]);
  const [filtered, setFiltered] = useState<AllCountriesProps[] | undefined>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [theme, setTheme] = useState<string>("light");

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
    if (e === "Filter by Region" || e.length < 2) return;

    setFiltered(
      allCountries?.filter((country) =>
        country.name.common.toLowerCase().includes(e.toLowerCase()),
      ),
    );
  };

  const handleSelect = (e: string) => {
    setFiltered(
      filtered?.filter(
        (country) => country.region.toLowerCase() === e.toLowerCase(),
      ),
    );
    console.log(e);
  };

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeChange = () => {
    setTheme((prevState) => (prevState === "light" ? "dark" : "light"));
  };

  return (
    <div className="bg-zinc-100 dark:bg-slate-800 dark:text-white">
      <header>
        <nav className="flex gap-2 p-5 shadow-lg">
          <h1 className="font-bold">Where in the world?</h1>
          <span className="self-center ml-auto" onClick={handleThemeChange}>
            <PiStarAndCrescent />
          </span>
          <p>Dark Mode</p>
        </nav>
      </header>
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
            <option value="America">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </section>
        <section>
          <div className="mt-5">
            {isLoading && <h1 className="text-center">Loading...</h1>}
            {filtered?.map((country) => (
              <div
                className="flex flex-col gap-5 mb-16 shadow-lg rounded-md pb-5 overflow-hidden cursor-pointer dark:bg-slate-700 dark:border-3 "
                key={country.name.common}
              >
                <img src={country.flags.png}></img>
                <div className="p-5 flex flex-col">
                  <h1 className="font-bold mb-5">{country.name.common}</h1>
                  <p className="font-bold">
                    Population:
                    <span className="font-light">
                      {" "}
                      {country.population.toLocaleString("en-US")}
                    </span>
                  </p>
                  <p className="font-bold">
                    Region:
                    <span className="font-light"> {country.region}</span>
                  </p>
                  <p className="font-bold">
                    Capital:
                    <span className="font-light"> {country.capital}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
