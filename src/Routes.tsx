import { HashRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute'
import DashBoard from './components/DashBoard'
import SignIn from './pages/signIn/index';
import Publish from './pages/publish/index';


const Routes = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" component={ SignIn } exact />
        <PrivateRoute path="/home" component={ DashBoard } />
        <PrivateRoute path="/publish" component={ Publish } />
      </Switch>
    </HashRouter>
  )
}

export default Routes;