import Nav from "./Nav";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { AllCountriesProps, Context } from "../Context";
import { useContext, useEffect, useState } from "react";

interface IndividualCountryProps extends AllCountriesProps {
  subregion: string;
  tld: [];
  currencies: {
    [key: string]: { name: string };
  };
  languages: { [key: string]: string };
  borders: string[];
}

function Country() {
  const { name } = useParams();
  const navigate = useNavigate();

  const { allCountries } = useContext(Context)!;

  const [individualCountryData, setIndividualCountryData] =
    useState<IndividualCountryProps[]>();

  const fetchIndidividualCountry = (name: string) => {
    fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true
`)
      .then((response) => response.json())
      .then((data) => {
        setIndividualCountryData(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchIndidividualCountry(name!);
  }, [navigate]);

  const getFullCountryName = (countryCode: string) => {
    return allCountries
      .filter((item) => item.cca3 === countryCode)
      .map((name) => name.name.common)[0];
  };

  const countryDetailsStyle = `dark:bg-slate-700 bg-zinc-300 rounded-md pl-1 pr-1 font-light`;

  return (
    <div className="dark:bg-slate-700 dark:text-white bg-zinc-100">
      <Nav />
      <div className="dark:bg-slate-800 p-1">
        <button
          className="flex items-center mt-5 p-1 border-2 pl-5 pr-5 dark:bg-slate-600 shadow:lg m-5 dark:border-none rounded-sm"
          onClick={() => navigate(-1)}
        >
          <BsArrowLeft /> Back
        </button>
        <div className="p-5">
          {individualCountryData &&
            individualCountryData.map((country) => (
              <div
                className="flex flex-col gap-5 mb-16 pb-5 cursor-pointer dark:border-3 "
                key={country.name.common}
              >
                <img src={country.flags.png}></img>
                <div className="mt-5 flex flex-col gap-2">
                  <h1 className="font-bold mb-5">{country.name.common}</h1>
                  <p className="font-bold">
                    Native name:
                    <span className={countryDetailsStyle}>
                      {
                        country.name.nativeName[
                          Object.keys(country.name.nativeName)[0]
                        ].official
                      }
                    </span>
                  </p>
                  <p className="font-bold">
                    Population:
                    <span className={countryDetailsStyle}>
                      {" "}
                      {country.population.toLocaleString("en-US")}
                    </span>
                  </p>
                  <p className="font-bold">
                    Region:
                    <span className={countryDetailsStyle}>
                      {" "}
                      {country.region}
                    </span>
                  </p>
                  <div className="font-bold">
                    Sub Region:
                    <span className={countryDetailsStyle}>
                      {country.subregion}
                    </span>
                  </div>
                  <div className="font-bold flex gap-1">
                    Capital:
                    <div className="flex gap-2">
                      <p className={countryDetailsStyle}>
                        {country.capital[0]}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold mt-5">
                    Domain:
                    <span className={countryDetailsStyle}> {country.tld}</span>
                  </p>
                  <p className="font-bold flex gap-1">
                    Currencies:
                    <span className="font-light flex gap-1">
                      {Object.keys(country.currencies).map((currencyCode) => (
                        <span
                          className={countryDetailsStyle}
                          key={crypto.randomUUID()}
                        >
                          {country.currencies[currencyCode].name}
                        </span>
                      ))}
                    </span>
                  </p>
                  <div className="font-bold flex gap-1">
                    Languages:
                    <div className="font-light flex flex-wrap gap-2">
                      {Object.keys(country.languages).map((language) => (
                        <span
                          className={countryDetailsStyle}
                          key={crypto.randomUUID()}
                        >
                          {country.languages[language]}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="font-bold mt-5">
                    <p> Border Countries:</p>
                    <div className="font-light gap-2 flex flex-wrap mt-1">
                      {country.borders?.length > 0 ? (
                        country.borders.map((borderingCountry) => (
                          <span
                            key={borderingCountry}
                            className="dark:bg-slate-700 bg-zinc-300 rounded-md p-1 pl-2 pr-2 font-light"
                            onClick={() =>
                              navigate(
                                `/name/${getFullCountryName(borderingCountry)}`,
                              )
                            }
                          >
                            {getFullCountryName(borderingCountry)}
                          </span>
                        ))
                      ) : (
                        <p className={countryDetailsStyle}>
                          No bordering countries
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Country;
