import Nav from "./Nav";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { AllCountriesProps } from "../Context";
import { useEffect, useState } from "react";

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

  const [individualCountryData, setIndividualCountryData] =
    useState<IndividualCountryProps[]>();

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true
`)
      .then((response) => response.json())
      .then((data) => {
        setIndividualCountryData(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("test", individualCountryData);

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
                <p className="font-bold">
                  Border Countries:
                  <div className="font-light">
                    {country.borders.map((borderingCountry) => (
                      ///need cca3 from API

                      <span>{borderingCountry}</span>
                    ))}
                  </div>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Country;
