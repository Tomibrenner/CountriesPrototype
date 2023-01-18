import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function SingleCountry() {
  const [country, setCountry] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    const getSingleCountry = async () => {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        const data = await res.json();
        setCountry(data);
      } catch (error) {
        console.error(error);
      }
    };

    getSingleCountry();
  }, [name]);

  useEffect(() => {
    document.title = `Countries | ${name}`;
  }, [name]);

  return (
    <>
      <section className="p-8 md:py-0 mx-auto">
        {country.map((item) => (
          <div
            key={item.population}
            className="dark:text-white grid grid-cols-1 gap-8 md:grid-cols-2 md:place-items-center md:h-screen"
          >
            <article>
              <img src={item.flags.svg} alt={item.name.common} />
            </article>
            <article>
              <h1 className="font-bold text-gray-900 dark:text-white text-4xl lg:text-6xl mb-8">
                {item.name.official}
              </h1>
              <ul className="my-4 flex flex-col items-start justify-start gap-2 text-slate-700 dark:text-gray-400">
                <li>
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    Capital:{" "}
                  </span>
                  {item.capital}
                </li>
                <li>
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    Population:{" "}
                  </span>
                  {item.population.toLocaleString()}
                </li>
                <li>
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    Region:{" "}
                  </span>
                  {item.region}
                </li>
                <li>
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    Area:{" "}
                  </span>
                  {item.area.toLocaleString()} km2
                </li>
                <li>
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    Subregion:{" "}
                  </span>
                  {item.subregion}
                </li>
                <li>
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    Flag:{" "}
                  </span>
                  {item.flag}
                </li>
              </ul>
              {item.borders && (
                <>
                  <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-2">
                    Borders:
                  </h3>
                  <ul className="flex flex-wrap items-start justify-start gap-2">
                    {item.borders.map((border, index) => (
                      <li
                        key={index}
                        className="bg-white p-2 rounded text-xs tracking-wide shadow dark:bg-gray-800 dark:text-gray-400 text-gray-700"
                      >
                        {border}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <Link
                to="/"
                className="inline-block mt-8 bg-white py-2 px-6 rounded shadow text-gray-700 hover:bg-gray-200 transition-all duration-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-400"
              >
                &larr; Back
              </Link>
            </article>
          </div>
        ))}
      </section>
    </>
  );
}
