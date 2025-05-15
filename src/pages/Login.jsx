import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/FakeAuthContext";
import styles from "./Login.module.css";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  // HERE WE WILL SET UP FAKE AUTHENTICATION:
  const { login, isAuthenticated } = useAuth(); // here we get our login function and isAuthenticated state from AuthProvider() in FakeAuthContext.jsx
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (email && password) login(email, password); // if correct email and password is given, then isAuthenticated state is true and the user is set to that FAKE_USER.
    //                                                So now we check if isAuthenticated state is true. If it is, we want to redirect the user to '/app'. So we do that
    //                                                by using a useEffect() adn we also first get isAuthenticated from the context:
  }

  // below we navigate to '/app' if isAuthenticated is true:
  useEffect(
    function () {
      // Now this effect has 2 big purposes. First of all, when the user successfully authenticates, ofcourse after login function has been called, the isAuthenticated
      // state will change to true and then this component will re-render and then in this effect, the below if will already be true, and then we navigate to the
      // application while in the beginning, the below if is still false. So on the initial render, this effect will also run but then the below if() is false and so then
      // we don't want navigate to the application. Now the nice side effect of that is when the user is already authenticated, but then clicks on Login from homescreen
      // on top right, they will automatically and immediately get redirected to the app itslef. But now when we click on back arrow button of the browser, it doesn't
      // work. The reason fro that is that we keep going back to the Login page but since we are already logged in, it keeps redirecting us to the '/app' page. So the
      // solution to this is to not even go back to the login page, but to really replace that we have ever been there. So we can to that by specifying an object in
      // navigate() below where set the replace property to true and so in this case, once the navigation below using navigate() happens, it will replace the Login page
      // in the history stack with '/app'. WE now go to <User/> component and remove the FAKE_USER created there and read it from the FakeAuthContext and then in the
      // <AppLayout/> component we include the <User/> component in the JSX and in the <User/> component, we implement the logout functionality byt also taking logout
      // function out from the context first.
      //
      // Now an important thing to note is to see what happens when we try to access the application without being logged in. So on clicking on Login button in Login
      // form, and then seeing the cities list and then reloading the page, this is what happens. So if try to just enter the /app/cities URL without first going through
      // the login flow, then we get this error. So we need to prevent that by protecting our application against unauthorized access, which is the 3rd part of typical
      // login flows in front end applications. So basically what we wanna do is to redirect the user back to the homepage, whenever they reach one of the routes that
      // they should not reach when they are not logged in, so really, the entire application should not be accessible to people who are not logged in. So we now have to
      // protect our routes. So now we create a specialized component that will handle this readirecting and then we will wrap the entire application in that component.
      // So we do that as a page here and we create a ProtectedRoute.jsx file in the pages folder. Now that component just receive the entire application as children so
      // it just returns children without adding any JSX to the children. So if the user is not authenticated, then we navigate to Homepage and that's all we have to do.
      // (Code logic is in <ProtectedRoutes/> component in the ProtectedRoutes.jsx file). Now all we have to do is to wrap our application inside the <ProtectedRoutes/>
      // component and there are 2 places where we can do this and the first one is in the <AppLayout/> component. However it is a lot more explicit to do it in App.jsx
      // where we define all our routes. So in App.jsx, in the <Route/> with path="app", inside the element prop, we wrap the <AppLayout/> component in <ProtectedRoutes/>
      // component.
      //
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate] // this effect runs each time isAuthenticated is changed
  );

  return (
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
