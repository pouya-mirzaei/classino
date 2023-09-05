import { useEffect, useState } from 'react';
import Home from './pages/Home/Home';
import PreLoader from './components/PreLoader';

function App() {
  useEffect(() => {
    document.body.classList.add('font-primary');
  }, []);

  return (
    <div className="min-h-screen relative">
      <Home></Home>
    </div>
  );
}

export default App;
