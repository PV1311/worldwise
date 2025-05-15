import {
  useNavigate,
  // useSearchParams
} from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import styles from "./Map.module.css";

import Button from "./Button";

import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
  // const navigate = useNavigate(); // this is another hook provided by React Router. All this function does is to return a function called navigate and we then use
  // //                                 this function to move to any URL. So below in the returned JSX, in the handler function in the onClick property of the container
  // //                                 element with class mapContainer, we call this function by simply passing "form" in it. So that's it, now whenever we click
  // //                                 somewhere on the map, we will move to the form. We now take this hook from here and place it in the <DetectClick/> component
  // //                                 below and why we do so is written in the explanation paragraph just above where we used useSearchParams() hook.

  // Now with useNavigat(), we can also simply navigate back, which is not something we can do with links. So now notes for this are in <Form/> component

  const [mapPosition, setMapPosition] = useState([40, 0]);

  // Now we want to display one popup on the map for each of the cities from the city list, so for that we need to read the cities out of CitiesContext.jsx and so we do
  // so just below and then we loop over cities and create <Marker/> component for each of them. Now in the cities array, each city has a position property and in there
  // we have lat and lng. So now we are going to use that position to display one marker for each of them. Also, just like the center prop in <MapContainer/> comtainer,
  // the position prop in <Marker/> component also expects an array so we pass an array in it with lat first and then lng. Also, the popup gets some classes that leaflet
  // puts there and so we use :global() in our css module to style them. So now we also modify the content of <Popup/> below in the returned JSX.
  const { cities } = useCities();

  // Now when we click on a city, we want to open the <City/> component for the clicked city and we also want the map to move to that position. So now we want to update
  // our mapPosition state using setMapPosition(). So now we will set the position of the map to the currently selected city and we will also attach an event handler to
  // the map. Now thanks to the query string, we already have the position of the currently selected city below which we get from URL using useSearchParams(). So now we
  // already have the position of the city in the lat and lng variables below and now we can display the map in that position. Now for map w change the variables to
  // mapLat and mapLng and use then in the center prop int the <MapContainer/> component. Now after doing this, if we click on a city then the map will move there but
  // now if we click on back button in the <City/> component on screen for the corresponding city and then click on another city, the map does not move there. So that is
  // because the center prop in the <MapContainer/> component is not reactive(so basically when the position(mapLng and mapLng) changes, the map does not move there). So
  // we need to implement this functionality one our own within this leaflet library. Now in this library evrything works with components. So when we want to implement a
  // functionality like this, we need to create a custom component and use that component in there. So we create that component right here in the same file below the
  // <Map/> component. We call it ChangeCenter. In there we use the useMap() hook, which is given to us by leaflet, to get the current instance of the map that is
  // currently being displayed and we store it in map variable and on that we call the setView() method and in it we pass the position that we receive as prop in
  // ChangeCenter(). So we basically set the view to that position. Since it is a component so w need to return some JSX but in this case we return null which is a
  // completely valid JSX. We the include this <ChangeCenter/> component in the end of the returned JSX of <Map/> component right before the closing of <MapContainer/>
  // container and in it we pass position prop which is basically going to be the array of the current mapLat and mapLng that we passed in center prop. Now after doing
  // all this, now when we click on a city the map moves there, but on clicking back button on screen from the corresponding <City/> component, we see blank white screen
  // because now the mapLat and mapLng passed in the <ChangeCenter/> component in position prop no longer exists, so they are undefined. So now in the original
  // application, on clicking on a city, the map moves there and on going back, the map stays there. So basically we want our <Map/> component to remember the latitude
  // and longitude over time. So that's the reason why we created a state variable(mapPosition). So that is where we will want to remember this latitude and longitude
  // and so we now need to synchronize the two of them. so we use an effect for that. After synchronizing in the effect, we then use the correct latitude and longitude
  // values while passing the position prop to the <ChangeCenter/> component, so in the position prop we now pass mapPosition and we pass it in center prop too.
  //
  // Now after all this, we also want to implement the feature that whenever we click on map, the form opens. So that is not as easy as adding the onClick prop to
  // <MapContainer/> component, so that doesn't exist here. So again, we we need to implement this feature on our own, so again we need to create another custom
  // component which we call DetectClick(). In there we use another one of react-leaflet library's custom hook called useMapEvents(). We don't save this hook anywhere,
  // like in a variable, instead, we pass in an object where we can define few properties for different type of events and one of them is click event. So in the object
  // we define a click property and as a value of the property, we define a callback function which takes the curremt event and then we can do something with it. Now if
  // we think about what we want to do, we know that we want to navigate to the form. So now we take the useNavigate() hook from the top of this <Map/> component and
  // place it in the top of <DetectClick/> component because we now want to programmatically navigate to the form url. So no in the callback function in the click
  // property which gets current event, we call navigate() and pass 'form' in it(we call navigate because we call useNavigate() and store it in navigate variable). Now,
  // in the returned JSX of the <Map/> component below, just after the <ChangeCenter/> component towards the end, we place <DetectClick/> component and we remove the
  // onClick prop from the container div in the returned JSX of the <Map/> component with the mapContainer class. So after doing it, we see that this works. So the form
  // opens when we click on the map. Now as the form opens, when we add this new city, we will create a new city object which we want to contain that position where we
  // clicked on the map. So this means that we need to give to the <Form/> component too, the access to the position where we click on the form. So once again, to do that
  // we will leverage the power of URL ands store that state in the URL. So as we click on the form, we can navigate to the form with the latitude and the longitude set
  // to wherever the click happened. So then inside the form, we can easily read that data from the URL just like we did in the <Map/> component already. So we again use
  // global state to pass data between pages otherwise we would have to create some global state variable where we would temporarily store that position which would be a
  // lot more work than simply storing it in the URL. So inside the <DetectClick/> component, in the callback function of click property, if we log the event that we
  // receive in callback, we can see that we get a latlng property whihc gives us exactly the position that has been clicked(i.e. lat and lng of position clicked). Now
  // this is ofcourse not the native event object that is created by the DOM or React but instead it is coming from the leaflet library. So now in the callback function,
  // instead of calling navigate() simply with 'form', we can now build a query string so that we can then read the data later in the form
  //
  // Now, we create a useGeolocation() custom hook in useGeolocation.js and in there we pass defaultPosition as a parameter with default value of null and we use this
  // parameter as initial state value of the poition state in there. We can now use the getPosition() function on any button to retrieve the current position of our
  // user. So now we use that below just below useSearchParams(). We destructure isLoading, position and getPosition from the hook and rename them as we did below to
  // avoid naming conflicts with already declared variables. Now we need to trigger this with a button. So now, in the returned JSX below, before the <MapContainer/>
  // component, we place the <Button/> component and pass type prop in it with value 'position', so type="position". We also define onClick prop which is simply
  // getPosition and inside <Button></Button> content, we do some conditional rendering. Now after this, clicking on the button on the UI, then checking the component
  // tree, we see that in the <Map/> component in the hooks, we have Geolocation and in there we have our position(in the fomr of lat and lng). So now what we want to
  // do with this position is to move the map there. So now we need to synchronize the mapPosition state with geolocationPosition(which we destructured from
  // useGeolocation() hook) and so we need another effect to do that. Now if we were not using useGeolocation() custom hook, then we could directly store the received
  // position into mapPosition, so in the useGeolocation.js file, in useGeolocation() functio, right where we use setPostion(), we set mapPosition right there. Since we
  // are using this custom hook, we cannot do that easily, we could pass a setter function, but that's not the point here. So this useGeolocation() hook should have its
  // own position state, we just happen to now want to synchronize that state here with our mapPosition so that we can then display exactly that. So now we create
  // another effect below the one already created. Now, after clicking the button on UI for getting geolocation position, once the geolocationPosition is received, the
  // button should disapper. So we conditionally render the <Button/>
  //
  // Now we will use the position data in order to fetch all necessary info about the city where the user has clicked on the map. So for example, if user clicks on Rome,
  // then in the Form we want to automatically fetch that data from an API, so from a reverse geocoding API. So now we do that in the <Form/> component and there the
  // first thing we need to do is to get the location data from the URL into that component. We did a similar thing here, so now instead of copying it, we create a custom
  // hook called useUrlPosition() in useUrlPosition.js file. and we noe import that data just below where we get data from the useGeolocation() custom hook below
  //
  // const [searchParams] = useSearchParams(); // this is simialar to useState() hook. So it returns an array which has the current state which we usually
  // //                                                            call searchParams and the second is a function with which we can set search params but we don't
  // //                                                           destructure it here right now because we won't need it. So we can also update the search params in this
  // //                                                            way. We moved this to useUrlPosition.js in hooks folder

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();

  // const lat = searchParams.get("lat"); // first we store the latitude into this lat variable because this data is not directly accessible on searchParams, so it's not
  // //                                      like an object that gives us this data. Instead, its an object onto which we need to now call get method and in it we pass the
  // //                                      name of the variable itslef(state variable from the URL) in string. We do same for longitude.
  // const lng = searchParams.get("lng");

  // for map we changed the lat and lng variables from just above to mapLat and mapLng just below
  // const mapLat = searchParams.get("lat"); // We moved this to useUrlPosition.js in hooks folder and renamed the variable to lat
  // const mapLng = searchParams.get("lng"); // We moved this to useUrlPosition.js in hooks folder and renamed the variable to lng

  // The below effect is for synchronizing the mapPosition state and the latitude and longitude
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng] // this effect should run whenever the mapLat or mapLng changes
  );

  // The below hook is for synchronizing the mapPosition state with geolocationPosition
  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition] // here we run our effect each time that the geolocationPosition changes
  );

  return (
    <div
      className={styles.mapContainer}
      // onClick={() => navigate("form")}
    >
      {/* <h1>Map</h1>
      <h1>
        Position: {lat}, {lng}
      </h1> */}

      {/* Below button is just for demonstration */}
      {/* <button onClick={() => setSearchParams({ lat: 23, lng: 20 })}>
        Change pos
      </button> */}
      {/* Now we can also update the query string using the setSearchParams() function. Now in setSearchParams() we need to pass and object with the entire new Query
          String. Now on clicking the Change pos button we see that the state has updated everywhere. So it changes not only in the URL but everywhere in the
          application where this data is read */}

      {/* Leaflet react gives us all the below predefined components that we can then use in order to display the map itself. So we include all of the components at
          top. To the <MapContainer/> component below we need to give it some position in the center prop. So we create a ampPosition variable above. And actually this
          mapPosition should be state because later on when this mapPosition changes we then want the map to re-render. So in the useState() we pass an array of lat and
          lng.So for now we pass an array [40, 0] and we pass the mapPosition into the <MapContainer/> belowmapPosition */}
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        // center={[mapLat, mapLng]}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a>
          contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        {/* <ChangeCenter position={[mapLat, mapLng]} /> */}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
