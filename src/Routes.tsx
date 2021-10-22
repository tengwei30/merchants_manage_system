import { HashRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute'
import SignIn from './pages/signIn/index';
import { getRoutes } from './helpers/routerMethods'

const routes = getRoutes()

const Routes = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" component={ SignIn } exact />
        {
          routes.map(item => {
            return item.component ? <PrivateRoute key={item.url} path={item.url} component={ item.component } /> : ''
          })
        }
      </Switch>
    </HashRouter>
  )
}

export default Routes;