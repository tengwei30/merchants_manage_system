import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import SignIn from './pages/signIn/index'
// import { getRoutes } from './helpers/routerMethods'

// const routes = getRoutes()
import Publish from './pages/good/publish/index'
import Sale from './pages/good/sale/index'
import WareHouse from './pages/good/warehouse/index'
import Brand from './pages/shops/brand/index'
import Illegal from './pages/good/illegal'
import AddGood from './pages/good/add-good'
import DashBoard from './components/DashBoard'

const Routes = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" component={SignIn} exact />
        {/* {routes.map((item) => {
          return item.component ? (
            <PrivateRoute key={item.url} path={item.url} component={item.component} />
          ) : (
            ''
          )
        })} */}
        <PrivateRoute path="/home" component={DashBoard} />
        <PrivateRoute path="/good/publish" component={Publish} />
        <PrivateRoute path="/good/sale" component={Sale} />
        <PrivateRoute path="/good/illegal" component={Illegal} />
        <PrivateRoute path="/good/warehouse" component={WareHouse} />
        <PrivateRoute path="/good/add-good" component={AddGood} />
        <PrivateRoute path="/shops/brand" component={Brand} />
      </Switch>
    </HashRouter>
  )
}

export default Routes
