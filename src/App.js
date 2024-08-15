import { useEffect, useState } from 'react';
import PreLoader from './components/PreLoader';
import { useRoutes } from 'react-router-dom';
import routes from './routes';

function App() {
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  useEffect(() => {
    // appling the font
    document.body.classList.add('font-primary');

    // set default theme
    if (localStorage.getItem('dark') == null) localStorage.setItem('dark', false);

    // displaing the preloader
    setTimeout(() => {
      setIsContentLoaded(true);
    }, 1000);
  }, []);

  const router = useRoutes(routes);

  return <>{isContentLoaded ? <>{router}</> : <PreLoader duration={1000} />}</>;
}

export default App;
