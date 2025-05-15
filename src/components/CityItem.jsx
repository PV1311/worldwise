import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  //   console.log(city);

  const { currentCity, deleteCity } = useCities(); // if currentCity.id(that is the id of the selected city) is equal to city id(which is just below), we will conditionally render
  //                                   .cityItem--active class in the <Link/> component here. We do so because after we select a city and the city opens and we come,
  //                                   back then we want the border of the selected city to be highlighted.

  // We also want a button to come back, just like we have in <Form/> component, So now we take the back button from the form and put it in a separate <BackButton/>
  // component and import it in both the <Form/> component and <City/> component

  const { cityName, emoji, date, id, position } = city;

  // Now, we want to create the functionality of deleting the city from the API and from the state when cross button is clicked and for that we set up the event handler
  // here because that button is here in the <CityItem/> component. Now if we define a onClick prop on the button and in the callback function we log a 'TEST' string, we
  // see that on clicking the cross button, TEST is logged but at the same time we also move to the <City/> component of the corresponding city and the reason for that
  // is that by clicking on the cross button, we are at the same time also clicking on the link. So we need to prevent that from happening first. So we create a
  // handleClick() handler function and pass it in onClick prop and in the handleClick() function, we call e.preventDefault(). Now in the handleClick() function, we call
  // the function that will delete the item and since this is again about our cities data we go back to CitiesContext.JSX and in the CitiesProvider() function we create
  // another function called deleteCity() and there we receive the id and then we submit a request to the URL with that id insife fetch() and there the method is going to
  // be "DELETE" and nothing else is needed in the options object. We then pass the deleteCity() function into our context, and above where we get currentCity from the
  // context, we also get deleteCity() there and then we call deleteCity() with the current id in the handleClick() handler function
  //
  // After all this, we now change our state management in CitiesContext.jsx to a useReducer. Now there, reducer function needs to be pure so ewe cannot fetch data in
  // the reducer. So all we can do is to make fetch() requests in separate functions and then after data has already bbeen received, we can then dispatch functions to the
  // reducer. So in case of asynchronous code/data, we cannot simply pass dispatch() function into the context value.
  //
  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        {/* While conditionally rendering the .cityItem--active class just above, we cannot do styles.cityItem--active because that wouldn't have worled because of the
            dashes */}
        {/* For storing id in URL, we wrapped this in <Link/>. In this <Link/> we define the to prop in which is where we will pass the data that we want to pass from
            this page to the next page. Here we need a string so we used template literals. Now on clicking a city it moves there and we see the id in the URL. Also,
            here we want to pass id only, if we pass /id, we go to page not found. Now we go to <City/> component and in order to get the data from the URl, we use the
            useParams() hook(provided by React Router). */}
        {/* Another way of data to the URL is Query String. So we can now add the current position of the city right in the URL as a query string. So adding that data
            to the Query String is quite easy. All we have to do is to add it to the path that the user will go to when they click on a city link. So now in the
            <CityItem/> component, which gets access to the current city, we destructure the position object too for the current city, which has lat and lng properties.
            So we add the Latitude to our string. So to do this, in the to prop, after the id we put a ? and then write the name of the state variable that we want to
            share so after id we do ?lat=${position.lat}. This will then pass it to the URL. We can add more by adding & and then doing same again, so overall we do
            ?lat=${position.lat}&lng=${position.lng}. So now the state that we had inside our application is now transferred to the URL. So we have latitude and
            longitude in the globally accessible URL so it is as if this data is now global state which we can access from anywhere and that includes the Map component.
            So now in the <Map/> component, we read the latitude and longitude from the URL using useSearchParams() hook. With this we successfully share our state with
            any component taht wants to access this. So we now do the same useSearchParams() thing in <City/> component */}

        {/* <span className={styles.emoji}>{emoji}</span> */}
        <img
          className={styles.emoji}
          src={emoji}
          alt="Country flag"
          width="24"
          height="18"
        />

        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
