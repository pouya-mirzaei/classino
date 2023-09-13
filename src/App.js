import { useEffect, useState } from 'react';
import Home from './pages/Home/Home';
import PreLoader from './components/PreLoader';
import { useRoutes } from 'react-router-dom';
import routes from './routes';

function App() {
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  useEffect(() => {
    // appling the font
    document.body.classList.add('font-primary');

    // displaing the preloader
    setTimeout(() => {
      setIsContentLoaded(true);
    }, 1000);
  }, []);

  const router = useRoutes(routes);

  return <>{isContentLoaded ? <>{router}</> : <PreLoader />}</>;
}

export default App;
