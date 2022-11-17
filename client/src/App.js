import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom' //importo 
import LandingPage from './COMPONENTS/LandingPage.jsx';
import Home from './COMPONENTS/Home';
import ActivityCreate from './COMPONENTS/CountryCreate';
import CountryID from './COMPONENTS/Detail'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
         <Switch>  {/* {te toma la última ruta acertada, si hay algún link que no existe} */}
          <Route exact path='/' component={LandingPage}/>
          <Route path='/home' component={Home}/>
          <Route path="/countries/:id" component={CountryID}/>
          <Route path="/actividades" component={ActivityCreate}/>
        </Switch>
        <h1>Henry Countries</h1>
      </div>
    </BrowserRouter>
  );
}

export default App;
