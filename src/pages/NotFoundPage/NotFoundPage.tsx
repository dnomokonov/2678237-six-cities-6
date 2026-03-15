import {Link} from 'react-router-dom';
import styles from './notFoundPage.module.css';

export function NotFoundPage() {
  return (
    <div className={styles['not-found-block']}>
      <h2>404 Not Found</h2>
      <Link
        to="/"
        className={styles['btn-link']}
      >
        Go to homepage
      </Link>
    </div>
  );
}
