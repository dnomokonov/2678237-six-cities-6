import {Link} from 'react-router-dom';
import styles from './notFoundPage.module.css';

export function NotFoundPage() {
  return (
    <div className={styles.notFoundBlock}>
      <h2>404 Not Found</h2>
      <Link
        to="/"
        className={styles.btnLink}
      >
        Go to homepage
      </Link>
    </div>
  );
}
