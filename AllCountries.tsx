import { AllCountriesProps } from "./src/Context";

interface Props {
  filtered: AllCountriesProps[] | undefined;
  isLoading: boolean;
}

function AllCountries({ filtered, isLoading }: Props) {
  const handleSelectCountry = (country: string) => {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="mt-5">
      {isLoading && <h1 className="text-center">Loading...</h1>}
      {filtered?.map((country) => (
        <div
          className="flex flex-col gap-5 mb-16 shadow-lg rounded-md pb-5 overflow-hidden cursor-pointer dark:bg-slate-700 dark:border-3 "
          key={country.name.common}
          onClick={() => handleSelectCountry(country.name.common)}
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
  );
}

export default AllCountries;
