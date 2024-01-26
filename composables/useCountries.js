import countries from "world-countries";

export const useCountries = () => {
  const formattedCountries = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region,
  }));

  const getAll = () => formattedCountries;

  const getByValue = (value) => {
    return formattedCountries.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};
