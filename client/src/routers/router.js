import { Route, Redirect, HashRouter, Switch } from 'react-router-dom';
import { debug, routesFilterPath } from '../helpers/common'
import PrivateRoute from '../routers/private-router';
import { useEffect, useState } from 'react';
import routes from './routes'

export default function Router(props) {
    const storedJwt = localStorage.getItem('X-CSRF-TOKEN')
    const [token, setToken] = useState(storedJwt || null)

    const updateToken = async (token, remove = false) => {
        // console.log("updateToken ", token, remove)
        // if (remove) {
        //     localStorage.removeItem('X-CSRF-TOKEN')
        // } else {
        //     localStorage.setItem('X-CSRF-TOKEN', token)
        // }
        // setToken(token)
    }

    return (<Switch>
        {
            routes.map(({ path, name, Component, isPrivate, roles }, key) => {
                return (isPrivate == true) ?
                    (
                        <PrivateRoute
                            exact
                            path={path}
                            key={key}
                            token={token}
                            component={Component}
                            updateToken={updateToken}
                            roles={roles}
                        />
                    ) :
                    (
                        <Route
                            exact
                            path={path}
                            key={key}
                            render={props => {
                                const crumbs = routesFilterPath(props.match.path, props.match.params)

                                // crumbs.map(({ name, path }) => console.log({ name, path }));

                                return (token == null) ?
                                    <Component {...props} crumbs={crumbs} updateToken={updateToken} />
                                    : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                            }}

                        />
                    )
            })
        }
    </Switch>
    )
}