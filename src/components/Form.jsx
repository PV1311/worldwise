// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useUrlPosition } from "../hooks/useUrlPosition";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";

import Button from "./Button";
import BackButton from "./BackButton";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// export function convertToEmoji(countryCode) {
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt());
//   return String.fromCodePoint(...codePoints);
// }
export function convertToEmoji(countryCode) {
  const code = countryCode.toLowerCase(); // countryflags.com uses lowercase country codes
  return `https://flagcdn.com/24x18/${code}.png`; // You can adjust resolution if needed
}

function Form() {
  // const navigate = useNavigate();

  const [lat, lng] = useUrlPosition(); // we get location data from useUrlPosition() custom hook here

  const { createCity, isLoading } = useCities();

  const navigate = useNavigate();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  // Now with useNavigate(), we can also simply navigate back, which is not something we can do with links. So now we have a button here in the returned JSX for going
  // back, so we now implement the functionality of going back but before doing that we create a reusable <Button/> component(which receives children prop and inClick
  // and type prop where type prop is a string based on which we conditionally render a class there) and we use the component here:
  // Now for going back, in the back button, in the handler function inside the onClick prop, we call the navigate function with -1 passed inside it which means to go
  // back 1 step in history. So -1 would mean go back 2 steps. So if from cities list we open form by clicking on the map, then on clicking back button we go back to
  // cities list. We also call e.preventDefault() before it because otherwise on clicking the back button form would reload because right now the button is inside the
  // form.

  // Now we will use the position data in order to fetch all necessary info about the city where the user has clicked on the map. So for example, if user clicks on Rome,
  // then in the Form we want to automatically fetch that data from an API, so from a reverse geocoding API. So now we do that in this <Form/> component and here the
  // first thing we need to do is to get the location data from the URL into that component. Now, we did a similar thing in the <Map/> component so instead of copying it,
  // we now create a custom hook. We did a similar thing here, so now instead of copying it, we create a custom hook called useUrlPosition() in useUrlPosition.js file. So
  // we now import data from useUrlPosition() custom hook at the very top level of this component. We will now use that data to actually do reverse geocoding, so getting
  // city information, or really any information about the GPS location that we are currently located at. We do that just below and we want to fetch this data right when
  // the component mounts, so we use a useEffect() for that. Now the data that we are going to fetch here is not going to go to our global state, so into the global
  // CitiesContext because this data is only relevant for then creating a city's object that will be then added to the array. So we only need this data right here in this
  // component. And so then we just fetch it right here. Now we are going to need a few pieces of state apart from the ones that we already have above. So first one is
  // isloadingGeocoding. We also create an emoji state because we want to conver the country name to emoji. To convert country to emoji, we can use the convertToEmoji()
  // function at the top which receives country code to work. So in the effect, while set the emoji, inside setEmoji(), we directly call convertToEmoji() with
  // data.countryCode. We also create geocodingError state for Error. We then also want to add the new city for which we pass handleSubmit handler function in onSubmit
  // prop in the form. Also, we install react-datepicker and instead of the input field in our returned JSX for date, we now put the <DatePicker/> component we get from
  // react-datepicker. Now in the <DatePicker/> component, we define a few props, because as we click the date field and tehn click on a certain date, we then need to
  // store that date somewhere. So to do that we define the onChange prop in <DatePicker/> component. In onChange, in the callback function, what we get is the selected
  // date(so not an event but really the date). So then we set date to that date we just received using setDate(). Then to display the date, we usually do that with the
  // value prop but here instead, we will use the selected prop and set it to the current date. We can also specify date format using dateFormat prop and we set it to
  // 'dd/MM/yyyy' string. Now we come back to the handleSubmit handler function and in their we create the newCity object. Then we create a function which uploads this
  // object to our fake API. So just like all the other functions that are about that API, we do that in the CitiesContext.jsx file and there in the CitiesProvider()
  // function, we create a createCity() function which get the newCity as input. Now in that function, it is now going to be a post request, so then in fetch(), we need
  // to specify the options object. We then also pass the function into the context. We then grap that function from there, here at the very top of this <Form/>
  // component just after where we used useUrlPosition() custom hook. Then, in handleSubmit() function, we call the createCity() function and pass the newCity object we
  // created there in it. Now after this, we need to do some more things, first of all, there needs to be some loading indicator, that tells the user that we are
  // currently adding a city and then after that we want to navigate back to the cities list. So first of all, we get the loading state, because right now, when we are
  // creating a city, we are also setting isLoading to true. So we can, as always, get access to that in this <Form/> component through our context. So in the top where
  // we get createCity function from our context, we also get isLoading there. So now in the <form> element below in the returned JSX,we conditionally render another
  // class called .form.loading which will make the button here look disabled and also the opacity will go down a bit. Now, finally, after adding a new city, we want
  // to programmatically navigate back to the cities list. So we do that in the handleSubmit() handler function and in navigate(), we pass '/app' because we want to go
  // back to the app page on submit. We could also pass '/app/cities' directly, however, it will not work like this because the createCity() we call, is an async
  // function and so right after we call the function, immediately the navigation will happen but that's not what we want. Instead, since createCity() is an async
  // function, and so it will return a promise, so we await the createCity() function call in handleSubmit() handler and we thus make the handleSubmit() function async:
  //
  // Now, we also want to create the functionality of deleting the city from the API and from the state when cross button is clicked and for that we set up the event
  // handler on that button which is in the <CityItem/> component
  //
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState("");

  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

  useEffect(
    function () {
      if (!lat && !lng) return;

      async function fetchCityData() {
        try {
          setIsLoadingGeocoding(true);
          setGeocodingError("");

          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          console.log(data);

          if (!data.countryCode)
            // we do this check before setting any sttae, in case user clicks somewhere on the map in the middle of nowhere. So whithout this, in that case, we get a
            // wierd data in form. So now, in tha case, we don't want to display the form. Now we also catch this error and place it into geocodingError state so that
            // based on that error, we can then display a message in place of showing <Sorm/> component
            throw new Error(
              "Doesn't seem to be a city. Click somewhere else. 😉"
            );

          setCityName(data.city || data.locality || ""); // if we click on some small place in the middle of nowhere on the map, them the city property will be epmty so
          //                                                then we can use locality. In case that also doesn't exist, we set it to empty string
          setCountry(data.countryName); // we set the country name too because later on we will want to set that country also to the new city object
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setGeocodingError(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  async function handleSubmit(e) {
    // Now the form gets submitted when one of the buttons on the form is clicked, so that is why in the <BackButton/> we did e.preventDefault() so that the back button
    // does not submit the form. So only Add button can submit the form. So when we click that, handleSubmit() function here will be called and then here again we do
    // e.preventDefault() because otherwise our page will get a hard reload which we do not want in a SPA.
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    // console.log(newCity);
    await createCity(newCity);

    navigate("/app/cities");
  }

  if (isLoadingGeocoding) return <Spinner />;

  if (!lat && !lng)
    return <Message message={"Start by clicking somewhere on the map"} />;

  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
        <img className={styles.flag} src={emoji} alt={country} />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}

        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        {/* <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button> */}

        {/* We would require the above Back button in the <City/> component too so we create a separate <BackComponent/> and the button also depends on useNavigate() so
            we take it from the top in this component and place it in BackButton.jsx and we also move the useNavigate import form here to there and then we import and use
            the <BackButton/> component here */}

        <BackButton />
      </div>
    </form>
  );
}

export default Form;
