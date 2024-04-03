import './App.css';
import AllProductsPage from './AllProductsPage.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductDetailsPage from './ProdectDetails.jsx'

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={AllProductsPage} />
          <Route path="/product/:id" component={ProductDetailsPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
