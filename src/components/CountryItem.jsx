import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      {/* <span>{country.emoji}</span> */}
      <img
        className={styles.emoji}
        src={country.emoji}
        alt="Country flag"
        width="24"
        height="18"
      />

      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
