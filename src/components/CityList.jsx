import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

// from our fake API, we could load the 3 city data here in this component because this is is where we will first need this data. But we will later need it in some other
// places too like in /app/countries and we also need it to display the markers on the map. So each city gets its own marker with some data of the city and there we will
// need this data again. So for now, we place this data in the App component as a global state(the cities state that we define there) that will be present to all the

// components that we want to pass in using props(we accept those props here below)(We will remove them when we later use context API).
function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  // if there is no data in cities array,
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
