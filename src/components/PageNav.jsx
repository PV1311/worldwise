import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.css"; // the classes from the module are exported to this one big object that we can then use usually we call that simply styles. In
//                                            the css module we should define only classes that we can then add in the component and we should not use element
//                                            selectors(like ul {} because this will slect all <ul> element in whole HTML which defeats the purpose of css modules whre
//                                            the styles are specific to a component). We can hoewever do .nav ul {} which selects all <ul> that are inside element with
//                                            nav class

// We use an unordered list, and inside each list item we are going to have one link to one of the pages
function PageNav() {
  return (
    <nav className={styles.nav}>
      {/* If we inspect this element we see a very weird className added. So this is what css module does. They take the classNames that we define ourselves and attach,
          something like a random id to the end and so then if we create a nav class in some other css module, that will get a different random id and so then the will
          be different classes in the end again  */}

      <Logo />

      <ul>
        <li>
          <NavLink to="/Pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
