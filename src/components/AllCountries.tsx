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
    <div className="mt-5 smTablet:grid smTablet:grid-cols-2 smTablet:gap-2 auto-cols-auto tablet:grid-cols-3 desktop:grid-cols-4 ">
      {isLoading && <h1 className="text-center">Loading...</h1>}
      {context.filteredCountries.map((country) => (
        <div
          className="flex flex-col gap-5 mb-16 shadow-lg rounded-md pb-5 overflow-hidden cursor-pointer dark:bg-slate-700 dark:border-3 "
          key={country.name.common}
          onClick={() => handleSelectCountry(country.name.common)}
        >
          <img
            src={country.flags.png}
            className="smTablet:h-48"
            alt={`Flag of ${country.name}`}
          ></img>
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
            <div className="font-bold flex gap-1">
              Capital:
              <div className="font-light flex flex-wrap">
                {Array.isArray(country.capital) ? (
                  country.capital.map((item) => (
                    <span key={crypto.randomUUID()} className="flex mr-2">
                      {item}
                    </span>
                  ))
                ) : (
                  <p className="mr-2">{country.capital}</p>
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
