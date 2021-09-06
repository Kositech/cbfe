import Login from '../pages/login'
import ProjectSelect from '../pages/projectSelect'
import Dashboard from '../pages/dashboard'

export default [
    { path: "/login", name: "", Component: Login, isPrivate: false, exact: true },
    { path: "/project-select", name: "", Component: ProjectSelect, isPrivate: false },
    { path: "/", name: "", Component: Dashboard, isPrivate: false}
]