import Login from '../pages/login'
import ProjectSelect from '../pages/projectSelect'
import Dashboard from '../pages/dashboard'
import PTW from '../pages/healthy-safety/ptw'
import NCR from '../pages/healthy-safety/ncr'
import GateAccess from '../pages/healthy-safety/gate-access'
import Iot from '../pages/healthy-safety/iot'
import VWTViewer from '../pages/vwt/vwt-viewer'

export default [
    { path: "/login", name: "", Component: Login, isPrivate: false, exact: true },
    { path: "/project-select", name: "", Component: ProjectSelect, isPrivate: false },
    { path: "/", name: "", Component: Dashboard, isPrivate: false},
    { path: "/healthy-safety/ptw", name: "", Component: PTW, isPrivate: false },
    { path: "/healthy-safety/ncr", name: "", Component: NCR, isPrivate: false },
    { path: "/healthy-safety/gate-access", name: "", Component: GateAccess, isPrivate: false },
    { path: "/healthy-safety/iot", name: "", Component: Iot, isPrivate: false },
    { path: "/VWT/viewer", name: "", Component: VWTViewer, isPrivate: false}
]