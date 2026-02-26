import './app.css';
import { BrowserRouter } from 'react-router-dom';
import RoutesComponent from './routes/routesComponent';

function App() {
  return (
    <BrowserRouter>
      <RoutesComponent />
    </BrowserRouter>
  );
}

export default App;
