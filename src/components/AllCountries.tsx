import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../Context";
interface Props {
  isLoading: boolean;
}

function AllCountries({ isLoading }: Props) {
  const navigate = useNavigate();
  const context = useContext(Context)!;

  const handleSelectCountry = (country: string) => {
    navigate(`/name/${country}`);
  };

  return (
    <div className="mt-5 sm:grid sm:auto-cols-min sm:gap-5">
      {isLoading && <h1 className="text-center">Loading...</h1>}
      {context.filteredCountries.map((country) => (
        <div
          className="flex flex-col gap-5 mb-16 shadow-lg rounded-md pb-5 overflow-hidden cursor-pointer dark:bg-slate-700 dark:border-3 "
          key={country.name.common}
          onClick={() => handleSelectCountry(country.name.common)}
        >
          <img src={country.flags.png} className="sm:h-48"></img>
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
            <div className="font-bold flex flex-wrap gap-1">
              Capital:
              <div className="font-light flex gap-2">
                {Array.isArray(country.capital) ? (
                  country.capital.map((item) => (
                    <p key={crypto.randomUUID()}>{item}</p>
                  ))
                ) : (
                  <p>{country.capital}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllCountries;
