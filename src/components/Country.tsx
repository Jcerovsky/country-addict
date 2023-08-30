import Nav from "./Nav";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { AllCountriesProps, Context } from "../Context";
import { useContext, useEffect, useState } from "react";

interface IndividualCountryProps extends AllCountriesProps {
  subregion: string;
  tld: [];
  currencies: {
    name: string;
  };
  languages: { [key: string]: string };
  borders: string[];
}

function Country() {
  const { name } = useParams();
  const navigate = useNavigate();

  const { filteredCountries } = useContext(Context)!;

  const [individualCountryData, setIndividualCountryData] =
    useState<IndividualCountryProps[]>();

  const fetchIndidividualCountry = (name: string) => {
    fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true
`)
      .then((response) => response.json())
      .then((data) => {
        setIndividualCountryData(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchIndidividualCountry(name!);
  }, []);

  const getFullCountryName = (countryCode: string) => {
    return filteredCountries
      .filter((item) => item.cca3 === countryCode)
      .map((name) => name.name.common)[0];
  };

  const handleClickOnBorderCountry = (countryCode: string) => {
    const countryName = getFullCountryName(countryCode);
    fetchIndidividualCountry(countryName);
  };

  return (
    <div className="dark:bg-slate-700 dark:text-white">
      <Nav />
      <div className="dark:bg-slate-800  h-screen p-1">
        <button
          className="flex items-center mt-5 p-1 border-2 pl-5 pr-5 dark:bg-slate-600 shadow:lg m-5 dark:border-none rounded-sm"
          onClick={() => navigate(-1)}
        >
          <BsArrowLeft /> Back
        </button>
        <div className="p-5">
          {individualCountryData?.map((country) => (
            <div
              className="flex flex-col gap-5 mb-16 shadow-lg pb-5 cursor-pointer  dark:border-3 "
              key={country.name.common}
            >
              <img src={country.flags.png}></img>
              <div className="mt-5 flex flex-col gap-2">
                <h1 className="font-bold mb-5">{country.name.common}</h1>
                <p className="font-bold">
                  Native name:
                  <span className="font-light">
                    {" "}
                    {country.name.nativeName.common}
                  </span>
                </p>
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
                  Sub Region:
                  <span className="font-light"> {country.subregion}</span>
                </p>
                <p className="font-bold">
                  Capital:
                  <span className="font-light"> {country.capital}</span>
                </p>
                <p className="font-bold">
                  Domain:
                  <span className="font-light"> {country.tld}</span>
                </p>
                <p className="font-bold">
                  Currencies:
                  <span className="font-light"> {country.currencies.name}</span>
                </p>
                <p className="font-bold">
                  Languages:
                  <span className="font-light">
                    {" "}
                    {country.languages.toLocaleString()}
                  </span>
                </p>
                <div className="font-bold">
                  Border Countries:
                  <div className="font-light gap-2 flex flex-wrap">
                    {country.borders.map((borderingCountry) => (
                      <span
                        className="border-2"
                        onClick={() =>
                          handleClickOnBorderCountry(borderingCountry)
                        }
                      >
                        {getFullCountryName(borderingCountry)}
                      </span>
                    ))}
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
