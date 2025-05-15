import {
  useParams,
  // useSearchParams
} from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../contexts/CitiesContext";
import { useEffect } from "react";
import Spinner from "./Spinner";
import BackButton from "./BackButton";
// import ButtonBack from "./ButtonBack";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams(); // to read data from URL. This useParams() returned an object here containing the id passed in the url(Ex: {id: 4545}). In the returned
  //                             object, the property name is the name of the parameter that we passed in the <Route/> to pass data in the URL. Here we immediately
  //                             destructure the id received from the URL.

  // BELOW IS JUST FOR LEARNING:
  // const [searchParams, setSearchParams] = useSearchParams(); // this is simialar to useState() hook. So it returns an array which has the current state which we usually
  // //                                                            call searchParams and the second is a function with which we can set search params. So we can also updat
  // //                                                            the search params in this way

  // const lat = searchParams.get("lat"); // first we store the latitude into this lat variable because this data is not directly accessible on searchParams, so it's not
  // //                                      like an object that gives us this data. Instead, its an object onto which we need to now call get method and in it we pass the
  // //                                      name of the variable itslef(state variable from the URL) in string. We do same for longitude.
  // const lng = searchParams.get("lng");

  // we could actually fetch the city data here and make a local state using useState() and in it pass empty object as initial value and then whatever object we get, we
  // store it into that local state. That would be perfectly valid. However that state would then be local only to this component. But wo do actually need that state in
  // another place(to implement feature which is that if we select Lisbon city, then the City component will mount with Lisbon city data and then if we click back button
  // then we see Lisbon city border highlighted which means that is now the current city still). So <CityItem/> component will also need this piece of state so that means
  // it is a global state. Therefore, now we create a currentCity state in CitiesProvider() function in the CitiesContext.jsx file and we also pass it into the context in
  // the value keyword in the returned <CitiesContext.Provider></CitiesContext.Provider>. Then in the CitiesContext.jsx file, in the CitiesProvider() function, we create
  // a function getCity() which will load the city which we can then call right here in this <City/> component as the component mounts. So now we also pass the getCity
  // function into the context. So now below we get the getCity function and currentCity from the useCities():

  const { getCity, currentCity, isLoading } = useCities();

  // Now we simply do an effect below where we simply call the getCity() function that we got access to with the current id which is coming from the URL
  useEffect(
    function () {
      getCity(id);
    },
    [id, getCity] // Now we get a warning that we should include the getCity() function there. But this created like an infinite loop of HTTP requests to our API on
    //               clicking on a city from the cities list.Now if we put getCity() in the dependency array, the effect will run each time that getCity() function gets
    //               updated(or in other words, it gets recreated). Now this getCity() function lives inside <CitiesProvider/> but the problem is that the getCity()
    //               function will update the state each time that it is executed which will then end up in an infinite loop. So to fix this, the solution is not to
    //               remove it from the dependecy array but to make it stable. So we need to not be recreated on every re-render So we do that using useCallback() hook
    //               in the <CitiesProvider/> component in CitiesContext.jsx file. This fixes the problem.
  );

  // Now, when we select a city and the city opens, and we go back, we want the border of the city that was selected to be highlighted. So we do that in the <CityItem/>
  // component where we conditionally render the .cityItem--active class in the <Link/>. Remeber if we want to add multiple class names with css modules, we need to do
  // so in a string, so we use template literal there. So now as we get the currentCity state here, we get it there too and if the city id over there is equal to
  // currentCity.id, then we render the .cityItem--active

  // TEMP DATA
  // const currentCity = {
  //   cityName: "Lisbon",
  //   emoji: "🇵🇹",
  //   date: "2027-10-31T15:59:59.138Z",
  //   notes: "My favorite city so far!",
  // };

  const { cityName, emoji, date, notes } = currentCity;

  // return (
  //   <>
  //     <h1>City {id}</h1>
  //     <p>
  //       Position: {lat}, {lng}
  //     </p>
  //   </>
  // );

  if (isLoading) return <Spinner />; // here we return a Loading spinner until the City is fetched

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          {/* <span>{emoji}</span> {cityName} */}
          <img
            className={styles.emoji}
            src={emoji}
            alt="Country flag"
            width="24"
            height="18"
          />{" "}
          {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
