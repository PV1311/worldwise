import { Outlet } from "react-router-dom";
import Logo from "./Logo";
import AppNav from "./AppNav";
import styles from "./Sidebar.module.css";

// we need nested Routes when we want part of UI to be controlled by part of the URL. So on the Sidebar, when we click on cities, we see cities adn in the URL, last part
// changes to cities and similarly, when we click on countries, we see countries on the sidebar and the last partof the URL changes to countries. When we click on the
// map, the last part of URL is the form and then we display form on the Sidebar. Now, note that when we click on cities we see /app/cities and last part is ofcourse
// cities as we discussed, but nested routes are not simply routes which are made up of multiple parts like this /app/cities in the URL(So just because we have a longer
// path with these 2 parts, this doesn't make it a nested route). Intead it is a nested route because this path here influences what component is rendered inside this
// bigger component(In this case cities list is rendered inside the big <AppLayout/> component). So we do that now in our own application where we want to declare a
// couple of nested routes. We do that inside a <Route/> element. So we go to App.jsx and in the <Route/> with path="app"(which is the first part of the nested URL), we
// now write it like an element(i.e. <Route></Route>) and we create some nested routes there(So basically child routes of the parent 'app' route). Now, the
// component that we define inside element prop in nested props will be displayed in place of <Outlet/> component. So in our Sidebar, after <logo/> and <PageNav/>
// components, we write <Outlet/>. So now as React sees the URL made of the 2 parts i.e. /app/cities, first it saw the app part and so that matched the app Route we
// defined in our App.jsx. Then the router notices there is also the cities part after app and so then it went to the nested cities route and selects it to be rendered
// and so then it renders the part inside the element prop of that nested route, right into the <Outlet/> element in the Sidebar. So this is similar to the children prop
// if we think about this.

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <footer className={styles.footer}></footer>
      <p className={styles.copyright}>
        &copy; Copyright {new Date().getFullYear()} by Worldwise Inc.
      </p>
    </div>
  );
}

export default Sidebar;
