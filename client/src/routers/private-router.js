import { useEffect, useState } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { routesFilterPath } from '../helpers/common'
import { apiLogout, apiGetCurrentUser } from '../helpers/api/account-management';
import variable from '../helpers/variable';
import Loader from '../components/loader';

export default function PrivateRoute({ component: Component, token, ...rest }) {
    let history = useHistory();
    const [checkUser, setCheckUser] = useState(false)
    const [user, setUser] = useState({})
    useEffect(() => {
        // async function fetchCurrentUser() {
        //     let result = await apiGetCurrentUser()
        //     // console.log("apiGetCurrentUser ", result, (typeof (result.errors) !== "undefined"))
        //     if (typeof (result.errors) !== "undefined") {
        //         rest.updateToken(null, true)
        //     } else if (result.status == 403) {
        //         rest.updateToken(null, true)
        //     } else {
        //         setUser(result)
        //     }
        // }

        // if (token !== null) {
        //     fetchCurrentUser()
        //     setCheckUser(false)
        // }
    }, [])

    useEffect(() => {
        // console.log("PrivateRoute rest userupdated", rest, user)
        // if (Object.keys(user).length > 0) {
        //     let checkRole = (typeof (rest.roles) == "undefined") ? false : !(rest.roles.includes(user.userType))
        //     if (checkRole) {
        //         // console.log("user.userType ", user.userType)
        //         history.push(variable.DEFAULT_REDIRECT[user.userType])
        //         // p.updateToken(null, true)
        //     }
        // }
    }, [user])

    useEffect(() => {
        // async function fetchLogout() {
        //     let res = await apiLogout()
        //     // console.log("res fetchLogout")
        // }

        // if (token == null) {
        //     fetchLogout()
        // }
    }, [token])

    return (
        <Route
            {...rest}
            render={(props) => {
                const crumbs = routesFilterPath(props.match.path, props.match.params)
                // check 
                let checkRole = (typeof (rest.roles) == "undefined") ? false : !(rest.roles.includes(user.userType))
                if (token !== null) {
                    return (Object.keys(user).length > 0 && !checkRole) ?
                        <Component {...props} crumbs={crumbs} user={user} updateToken={rest.updateToken} roles={rest.roles} />
                        : <Loader />
                } else {
                    return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                }
            }}
        />
    )
}