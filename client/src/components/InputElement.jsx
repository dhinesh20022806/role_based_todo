import styles from "./InputElement.module.css";
const InputElement = ({ type, name, label, textarea, ...props }) => {
  return (
    <p className={styles.container}>
      <label htmlFor={name}>{label}</label>
      {textarea ? (
        <textarea name={name} {...props}></textarea>
      ) : (
        <input type={type} name={name} {...props} />
      )}
    </p>
  );
};

export default InputElement;
