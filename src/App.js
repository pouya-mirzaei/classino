import { useEffect } from 'react';
import Home from './pages/Home/Home';

function App() {
  useEffect(() => {
    document.body.classList.add('font-primary');
  }, []);

  return (
    <div className="h-[2000px]">
      <Home></Home>
    </div>
  );
}

export default App;
