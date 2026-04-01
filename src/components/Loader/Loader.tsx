import styles from './Loader.module.css';

export function Loader() {
  return (
    <div className={styles.spinnerContainer}>
      <p>Loading...</p>
      <div className={styles.loadingSpinner}></div>
    </div>
  );
}
