// import { Link } from "react-router-dom";
// import PageNav from "../components/PageNav";
// import AppNav from "../components/AppNav";

// function Homepage() {
//   return (
//     <div>
//       <PageNav />
//       <AppNav />
//       {/* Just above, while inspecting, we see that the nav classes added are indeed different */}
//       <h1>Worldwise</h1>

//       {/* To Link the different Pages to the Routes that we defined in App component in App.jsx, we do it with <Link/> component as below which is provided by the
//           React Router. So for demo, we use the <Link><Link/> component belowx and in it we use the to prop where we specify the path /pricing i.e. to="/pricing"
//           (It is important the we specify the slash here before pricing i.e. we do /pricing and not pricing, so that our URL always starts from the root). Now, from
//           the Homepage, when we click on the Pricing link, we move to another page and we got no new requests(as seen from Network tab of dev tools). So only that
//           happened was that our DOM got replaced which we can see in component tree in React dev tools where in place of Homepage, we now have Pricing. This now makes
//           it a SPA with no relaod on Page transition which otherwise would happen with <a> element. So now we can move from Home page to Pricong page but what about
//           the other pages ? So for that we use a Page Navigation component(called PageNav.jsx in components folder in src) which we can then use in all the pages so
//           that we can then transition between them. We create this component and use it in each of the pages. Also, one thing we often do in Navigations like these is
//           to display the currently visited page(Ex: Highlighting the Pricing navigation link when visiting that page. So for that instead of using <Link/> component
//           we can use <NavLink/> component(also provided by React Router), keeping rest everything same as <Link/> component(i.e. the props an all). We can see that
//           with <NavLink/>, whech we inspect the Navigation link of the visited page, we see it gets the active class which we can then use to stylw it differently. */}

//       {/* <Link to="/pricing">Pricing</Link> */}

//       <Link to="/app">Go to App</Link>
//     </div>
//   );
// }

// export default Homepage;

// ABOVE WAS FOR LEARNING BELOW IS ACTUAL PAGE IMPLEMENTATION:
import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";

import styles from "./Homepage.module.css";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />

      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <Link to="/login" className="cta">
          Start tracking now
        </Link>
        {/* In this link we actually want to navigate to '/login and not '/app' which we did earlier */}
      </section>
    </main>
  );
}
