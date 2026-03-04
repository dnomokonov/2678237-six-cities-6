import {MainPage} from './pages/MainPage.tsx';

type MainPageProps = {
  offersCount: number;
};

export default function App({offersCount} : MainPageProps) {
  return (
    <MainPage offersCount={offersCount}/>
  );
}
