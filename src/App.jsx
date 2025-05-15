// import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import { lazy, Suspense } from "react";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Product from "./pages/Product"; // we commented these 6 imports be we lazy load them
// import Pricing from "./pages/Pricing";
// import Homepage from "./pages/Homepage";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";
// import PageNotFound from "./pages/PageNotFound";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  // Now, we complete our <City/> component. So when we click on a City from the Cities list, it loads the data about the city and shows it ono the <City/> component. So
  // we do an http request to "http://localhost:9000/cities" url, whic gets all the cities, but then from there if we take one the ids from the city data and pass it in
  // the url(so for example, the url becomes http://localhost:9000/cities/73930385) then we only get information about the city object corresponding to that id. Now,
  // here our project is small so we could get this object out of the cities array directly, but in real world application, it's quiet common that the single objects have
  // a lot more data than the entire collection. So basically the cities array(the cities array(which is a state) is in the CitiesProvider() function in the
  // CitiesContext.jsx) would only have a small amount of data in each object while the objects we get individually from the API have really all the data so then we
  // really need to do this http request. So considering that practice, we do it in our project. So now we go to the <City/> component and fetch the data there because
  // that is where we need the data
  //
  // Now we go to the <Map/> component to implement that using react-leaflet
  //
  // Now we want to setup fake authentication. It works in 3 steps, first we get user's email and password from login and check with an API endpoint if the password for
  // the given user is correct. In 2nd step, if credentials are correct, we direct the user to our main application and we save the user object in our state. Finally, as
  // a 3rd step, we need to protect the application from unauthorized access. Now fake authentication is the 1st step, here we will not ask for the user credentials from
  // an API, but instead we will have a hardcoded user object in our application and we'll simply check if the user and password are correct. So now, we will store the
  // user that is logged in, into state and we will also store into state whether user is currently logged in or not. So we create another context inFakeAuthContext.jsx
  // file, where we can store that state and give the entire application tree, access to that state. Now, in the login form, when the login button is clicked, a login
  // function is called where we will check if the user's credentials are correct. So we will create it inside AuthProvider() function. We also have a logout button. So
  // clicking those buttons will create the actions we talked about, so setting the user to authenticate it and storing the user in state. Now after creating the
  // FakeAuthContext.jsx file, we then provide AuthProvider(so the AuthContext) to the entire component tree below. Then we go to Login.jsx file in the pages folder so
  // that we can then hadnle clicking on the Login button, so basically, when the user submits the login form.
  //
  // Now we use profiler to see if we have any performance issue and whether there is anything that we need to optimize in terms of wasted renders. So we start profiling
  // and walk through the entire application to see if there are any performance bottlenecks. We see in the Ranked graph that overall in all renders, maximum time taken
  // for re-render is like 2.3 ms something. Now we will analyze one state transition here. So we start profiling from the login part and we click on login button in the
  // login form. So just in that navigation was 4 state updates(as evident from 4 re-renders in profiler). So we again see from both the flame graph and the ranked chart
  // that everything is working fluidly. Now there was an issue earlier in the <City/> component in useEffect() dependency array. We left out the getCity() function
  // from the dependency array even though React was warning us to include it. So we now go there.
  //
  // Now after it, we optimizeour bundle size simply by doing code splitting which takes the bundle and splits it into multiple parts. So instead of just having one huge
  // JS file, we will have multiple smaller files which can then be downloaded over time as they become necessary for the application and this process of loading code
  // sequentially is called lazy loading. This is one of the biggest performance gains that we can achieve for or users. Now there are many ways in which we can split
  // the bundle, so we can lazily load our components. But the most common one is to split the bundle at the route level(or on other words, at the page level). So we are
  // gonna take all the components that represent a page and load each of them separately. So now first we identify our pages which are <Homepage/>, <Product/>,
  // <Pricing/>, <Login/>, then the entire application itself which is in <AppLayout/> and finally <PageNotFound/>. So we now comment these page imports from top and at
  // the top just below where we commented the imports. So instead of writing import, we just write the name of the component and then we use React's lazy() function. So
  // this lazy() function is a feature which is built into React and then Vite(or Webpack) will automatically split the bundle when they see this lazy() function. So now
  // inside lazy(), we need a callback function which will call the dynamic import() function(which is actually part of JS). Now further inside import(), we need the path
  // to the component itself. Ex: './page/Homepage' for <Homepage/> component. Note that these dynamic imports should come after the normal imports. Similarly we create
  // dynamic imports for the remaining 5 page components. Now this is not the end of story. We now also want to display a loading spinner while we go from one page to
  // another(so basically while these pages are being loaded in the background). So now this is where the React's Suspense API comes into play for the first time. So,
  // Suspense is a concurrent feature that is part of modern React and that allows certain components ro suspend, which basically means that it allows them to wait for
  // something to happen and in our case basically the lazy components are gonna be suspended while they are loading. So we can then use the built in suspense component
  // to show a fallback, whichi in our case is gonna be that loading indication that we just talked about. So we now go to the tree just below in the returned JSX and
  // there above the <Routes></Routes> component, we include <Suspense></Suspense>(so inside <BrowserRouter></BrowserRouter> we now have <Suspense></Suspense> and further
  // inside it we have <Routes></Routes>) and in it we specify the fallback prop which takes in a react element which is going to be our <SpinnerFullPage/> component. So
  // with this we are good to go.

  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              {/* <Route path="/" element={<Homepage />} /> */}
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoutes>
                    <AppLayout />
                  </ProtectedRoutes>
                }
              >
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
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
