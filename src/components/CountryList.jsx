import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

// from our fake API, we could load the 3 city data here in this component because this is is where we will first need this data. But we will later need it in some other
// places too like in /app/countries and we also need it to display the markers on the map. So each city gets its own marker with some data of the city and there we will
// need this data again. So for now, we place this data in the App component as a global state(the cities state that we define there) that will be present to all the

// components that we want to pass in using props(we accept those props here below)(we will remove them when we use context API later).
function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  // if there is no data in cities array,
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      // in just above if() we check if the array already contains the current city. So arr.map((el) => el.city) will create an array of all the cities that are already
      // in the countries array and then with includes() we check if it contains the country in the current city. So we use ! infront of that i.e. if it is not the case
      // i.e. if the current country is not yet in the arrar that we are creating here(i.e. the 2nd argument of the reduce() function) then we return a new array which
      // contains all the current elements plus the new one else we return the current countries array
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
