// import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

import { CitiesProvider } from "./contexts/CitiesContext";

// we need nested Routes when we want part of UI to be controlled by part of the URL. So on the Sidebar, when we click on cities, we see cities and in the URL, last part
// changes to cities and similarly, when we click on countries, we see countries on the sidebar and the last partof the URL changes to countries. When we click on the
// map, the last part of URL is the form and then we display form on the Sidebar. Now, note that when we click on cities we see /app/cities and last part is ofcourse
// cities as we discussed, but nested routes are not simply routes which are made up of multiple parts like this /app/cities in the URL(So just because we have a longer
// path with these 2 parts, this doesn't make it a nested route). Intead it is a nested route because this path here influences what component is rendered inside this
// bigger component(In this case cities list is rendered inside the big <AppLayout/> component). So we do that now in our own application where we want to declare a
// couple of nested routes. We do that inside a <Route/> element. So we come here to App.jsx and in the <Route/> with path="app"(which is the first part of the nested
// URL), we now write it like an element(i.e. <Route></Route>) and we create some nested routes there(So basically child routes of the parent 'app' route). Now, the
// component that we define inside element prop in nested props will be displayed in place of <Outlet/> component. So in our Sidebar, after <logo/> and <PageNav/>
// components, we write <Outlet/>. So now as React sees the URL made of the 2 parts i.e. /app/cities, first it saw the app part and so theat matched the app Route we
// defined below. Then the router notices there is also the cities part after app and so then it went to the nested cities route and selects it to be rendered and so
// then it renders the part inside the element prop of that nested route, right into the <Outlet/> element in the Sidebar. So this is similar to the children prop if we
// think about this.

// Now by default when we come just to the app, then we want to show by default the city list. So we can do that with index route. The index router is the child route
// that is going to be matched if none of the other routes match. So it is the case here because we will have nothing ag=fter /app in the URL so that none of the other
// nested routes in the app route will be matched. So we define the index route as we did in the code below, by adding index keyword. We can do the same thing with our
// Homepage, So here below in the route with path="/", we can replace path="/" with index so now when we reload the application, it by default goes to the Homepage on
// clicking on logo.

// Now, we need a way of moving between the different nested routes. So now we implement our App navigation component(AppNav.jsx)

function App() {
  // We will use special components that React Router gives us, to define our routes right in the JSX. We start by using <BrowserRouter/> component and inside it we use
  // <Routes/> component. Now inside it we do our actual router definition byt using <Route/> component. In this we define the URL which is called the path prop and then
  // for each path we will be able to define one component. Then after path, we need to define a React element(using element prop) which we get by using the component(We
  // define element prop because this way it will be easier to pass props to the element). So we define a Route for the product path which is for Product page, pricing
  // path which is for Pricing page and also the root path(which is the <Route/> with path="/") for Homepage, below:

  // Note: - If below, we returned a <div> and inside we had an <h1> and then the <BrowserRouter/> component then on every page we will have the <h1>, only the router
  //         will change the the part below the <h1>(i.e. the <BrowserRouter/> component and everything inside it) by changing the element based on the URL(or path):

  // To Link the different Pages to these Routes that we defined below, we do it with <Link/> component which is provided by the React Router. So for demo, we use the
  // <Link><Link/> component in the Homepage.jsx and in it we use the to prop where we specify the path /pricing i.e. to="/pricing"(It is important the we specify the
  // slash here before pricing i.e. we do /pricing and not pricing, so that our URL always starts from the root). Now, from the Homepage, when we click on the Pricing
  // link, we move to another page and we got no new requests(as seen from Network tab of dev tools). So only that happened was that our DOM got replaced which we can
  // see in component tree in React dev tools where in place of Homepage, we now have Pricing. This now makes it a SPA with no relaod on Page transition which otherwise
  // would happen with <a> element. So now we can move from Home page to Pricing page but what about the other pages ? So for that we use a Page Navigation component
  // (called PageNav.jsx in components folder in src) which we can then use in all the pages so that we can then transition between them. We create this component and
  // use it in each of the pages. Also, one thing we often do in Navigations like these is to display the currently visited page(Ex: Highlighting the Pricing navigation
  // link when visiting that page. So for that instead of using <Link/> component we can use <NavLink/> component(also provided by React Router), keeping rest everything
  // same as <Link/> component(i.e. the props an all). We can see that with <NavLink/>, when we inspect the Navigation link of the visited page, we see it gets the
  // active class which we can then use to style it differently.

  // from our fake API, we could load the 3 city data here in the <CityList/> component because that is is where we will first need that data. But we will later need it
  // in some other places too like in /app/countries and we also need it to display the markers on the map. So each city gets its own marker with some data of the city
  // and there we will need this data again. So for now, we place this data here in the App component as a global state(the cities state that we define here) that will
  // be present to all the components that we want to pass in using props. We also pass the cities array to <CountriesList/> component and from there we can then extract
  // the countries:

  // const BASE_URL = "http://localhost:9000";

  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // // Right now, doing as just below in the useEffect(), we fetch the cities data even when the application first loads(so on the homepage, pricing and product page too
  // // where we don't really need that data yet). For now, we do it like this and we will later change this. After fetching the data and setting the states we then pass
  // // them as props in the nested Routes:
  // useEffect(function () {
  //   async function fetchCities() {
  //     try {
  //       setIsLoading(true);
  //       const res = await fetch(`${BASE_URL}/cities`);
  //       const data = await res.json();
  //       setCities(data);
  //     } catch {
  //       alert("There was an error loading data");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchCities();
  // }, []);

  // Now, in the original app, we see that in city list, on hovering on a city, on bottom left we se the url has the city id in the end, so on clicking on the city, it
  // will now move there and now that id can be seen in the URL in the browser on top. We notice that on clicking on the city, the component we see uses the URL to fetch
  // the data about that city from the fake API. This is an example of passing data from one page to another. So in this case, we passed the id of the city by clicking on
  // it and then in the component on the page that opens on clicking the city, we read that id from the URL. We do all that without storing the data somewhere in the
  // React application which we would hav to do without React Router. So we now do that in our application. To use params with React Router we do it in 3 steps:- first we
  // create a new Route, then we link to that Route and then in that Route we read the state from the URL. So below we create a new Router right after the route with
  // path="cities". In it we define path="cities/:id" i.e. after cities we do /: and then whatever name we want to give to our parameter. From thereon the rest is the
  // same. In element={} we use <City/> component. Next we want to link to this rout that we created. So we want to that in each fo the list items in the city ist so we
  // go to <CityItem/> component and link over there by wrapping the returned JSX inside <li>, in <Link></Link> and in the to prop we pass the data that we want to pass
  // from that page to the one that opens when a city is clicked which is simply id, so we simply do to={`${id}`} because we already destructured the id there. we do not
  // do to={`/${id}`} otherwise we go to page not found. Also, now on clikcing a city, we see another page open where the <City/> component is displayed on sidebar and
  // also, in URL, we can see the id passed. Now we go to <City/> component to read this data from URL using useParams() hook(provided by React Router).

  // Another way of data to the URL is Query String. So we can now add the current position of the city right in the URL as a query string. So adding that data to the
  // Query String is quite easy. All we have to do is to add it to the path that the user will go to when they click on a city link. So now in the <CityItem/> component,
  // which gets access to the current city, we destructure the position object too for the current city, which has lat and lng properties. So we add the Latitude to our
  // string. So to do this, in the to prop, after the id we put a ? and then write the name of the state variable that we want to share so after id we do
  // ?lat=${position.lat}. This will then pass it to the URL. We can add more by adding & and then doing same again, so overall we do
  // ?lat=${position.lat}&lng=${position.lng}. So now the state that we had inside our application is now transferred to the URL. So we have latitude and longitude in
  // the globally accessible URL so it is as if this data is now global state which we can access from anywhere and that includes the Map component. So now in the <Map/>
  // component, we read the latitude and longitude fro the URL using useSearchParams() hook. With this we successfully share our state with any component taht wants to
  // access this. So we now do the same useSearchParams() thing in <City/> component

  // Now we learn about programmatic navigation using useNavigation() custom hook. So programmatic navigation mean to move to a new URL, without the user having to click
  // on any link and a common usecase of this behaviour is right after submitting a form where many times when a user submits a form, we want them to move a new page in
  // our application automatically. So now in our application, whenever user clicks anywhere on the map container, we then want to move to the form component. So notes on
  // that are now in <Map/> component

  // Now while learning about programmatic naviagation we also see the <Navigate/> component. Now since we have React hooks, <Navigate/> component is not so much used
  // anymore nut there is still one very important use case for it, which is inside nested routes. Now from the Homepage, when we click on Start tracking button and come
  // to the app component, we see that right now we are not in /app/cities and that's why the cities button right under the logo is not selected and when we click on the
  // cities button, only then we move to /app/cities. So right now if we click on a city from the CityList, we go to Page not found. So we can fix this with <Navigate/>
  // component to immediately navigate to the url with /app/cities in the end. So right now in the nested routes inside the route with path="app", we have both the index
  // routes and the cities routes pointing to the exact same element. So now in the index route, we change the element and now use <Navigate/> component that
  // react-router-dom gives us. Now in this <Navigate/> component, just like in the links we can specify the to prop and i it we write 'cities', so to='cities'. Now after
  // all this, this is then basically like a redirect. So as soon as index route is hit, it will redirect us to the cities route, Still there is a problem, if we click on
  // the back arrow button on top left of browser, nothing happens. To fix that we also add the replace keyword in the <Navigate/> component. This will then replace the
  // current element in the history stack.

  // Now, we move the above states and state logics in a custom context provider. So now we create a new contexts folder in src and in in we create CitiesContext.jsx file
  // and we move the state and state updating logic above(which also include useEffect()) to the CitiesProvider() function in CitiesContext.jsx file and return
  // <CitiesContext.Provider></CitiesContext.Provider> in the JSX of the CitiesProvider() function and export CitiesProvider from there and import it here in the <App/>
  // component and wrap the entire <BrowserRouter></BrowserRouter> component in the returned JSx below inside <CitiesProvider></CitiesProvider>. We also now remove the
  // props that we normally passed in the <CityList/>(we passed citites and isLoading props in it) and <CountryList/>(we passed citites and isLoading props here too)
  // component in the element prop in the routers below. Now we create a custom hook useCities() in the CitiesContext.jsx file and export it from there and import it
  // wherever we need it. So we import them in <CityList/> and <CountryList/> components and destructure the props there.

  // Now I made this file as App-v1.jsx and copied this code in App.jsx because this file is getting too big with comments

  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Homepage />} /> */}
          <Route index element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          {/* Now, we can create a PageNotFound.jsx component and create another <Route/> here with path="*"(this will then catch all the Routes that we not catched to the
            other 3 above) and element={<PageNotFound/>}. This is how we implement the Page Not Found*/}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
