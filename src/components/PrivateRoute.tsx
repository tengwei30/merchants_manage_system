import { FC } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { isAuth } from '../helpers/auth'

interface PrivateRoute extends RouteProps {
  component: React.ComponentType<any>
}

/**
 * 受保护的组件
 * @param param
 * @returns
 */
const PrivateRoute: FC<PrivateRoute> = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const auth = isAuth()
        if (auth) {
          return <Component {...rest} />
        } else {
          return <Redirect to="/" />
        }
      }}
    />
  )
}

export default PrivateRoute
