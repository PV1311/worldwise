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
import ProtectedRoutes from "./pages/ProtectedRoutes";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";

function App() {
  // Now, we complete our <City/> component. So when we click on a City from the Cities list, it loads the data about the city and shows it ono the <City/> component. So
  // we do an http request to "http://localhost:9000/cities" url, whic gets all the cities, but then from there if we take one the ids from the city data and pass it in
  // the url(so for example, the url becomes http://localhost:9000/cities/73930385) then we only get information about the city object corresponding to that id. Now,
  // here our project is small so we could get this object out of the cities array directly, but in real world application, it's quiet common that the single objects have
  // a lot more data than the entire collection. So basically the cities array(the cities array(which is a state) is in the CitiesProvider() function in the
  // CitiesContext.jsx) would only have a small amount of data in each object while the objects we get individually from the API have really all the data so then we
  // really need to do this http request. So considering that practice, we do it in our project. So now we go to the <City/> component and fetch the data there because
  // that is where we need the data

  // Now we go to the <Map/> component to implement that using react-leaflet

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

  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
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
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
