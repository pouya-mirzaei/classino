import { useEffect, useState } from 'react';
import Home from './pages/Home/Home';
import PreLoader from './components/PreLoader';

function App() {
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  useEffect(() => {
    // appling the font
    document.body.classList.add('font-primary');

    // loading the preloader
    setTimeout(() => {
      setIsContentLoaded(true);
    }, 2000);
  }, []);

  return <>{isContentLoaded ? <Home /> : <PreLoader />}</>;
}

export default App;
