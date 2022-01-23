import {useRoutes} from "./routes";

import './App.scss';
import 'materialize-css/sass/materialize.scss';

function App() {
  // const isAuthenticated = !!localStorage.getItem('userData');
  // const routes = useRoutes(isAuthenticated);
  const routes = useRoutes(true);

  return (
      <div className="container">
          { routes }
      </div>
  );
}

export default App;
