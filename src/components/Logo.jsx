import styles from "./Logo.module.css";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <img src="/logo.png" alt="WorldWise logo" className={styles.logo} />
    </Link>
  );
  // on clicking on the Logo we should return to homepage so we wrapped the <img> element in <Link/> component. This time we are using <Link/> because we don't want to add any special styles when this is selected
}

export default Logo;
