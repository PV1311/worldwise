import styles from "./Button.module.css";

function Button({ children, onClick, type }) {
  // here we also accept a type string and based on that type we will conditionally add a css class

  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {/* to add more that one class we use template literal */}
      {children}
    </button>
  );
}

export default Button;
