import { HashRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute'
import DashBoard from './components/DashBoard'
import SignIn from './pages/signIn/index';
import Publish from './pages/good/publish/index';
import Sale from './pages/good/sale/index';
import WareHouse from './pages/good/warehouse/index';
import Brand from './pages/shops/brand/index'
import Illegal from './pages/good/illegal';


const Routes = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" component={ SignIn } exact />
        <PrivateRoute path="/home" component={ DashBoard } />
        <PrivateRoute path="/good/publish" component={ Publish } />
        <PrivateRoute path="/good/sale" component={ Sale } />
        <PrivateRoute path="/good/illegal" component={ Illegal } />
        <PrivateRoute path="/good/warehouse" component={ WareHouse } />
        <PrivateRoute path="/shops/brand" component={ Brand } />
      </Switch>
    </HashRouter>
  )
}

export default Routes;