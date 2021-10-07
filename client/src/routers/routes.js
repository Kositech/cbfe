import Login from '../pages/login'
import ProjectSelect from '../pages/projectSelect'
import Dashboard from '../pages/dashboard'
import PTW from '../pages/health-safety/ptw'
import NCR from '../pages/health-safety/ncr'
import GateAccess from '../pages/health-safety/gate-access'
import Iot from '../pages/health-safety/iot'
import HealthSafety from '../pages/health-safety/health-safety'
import VWTViewer from '../pages/vwt/vwt-viewer'
import Favourite from '../pages/central-search/favourite'
import CentralSearch from '../pages/central-search/central-search'

export default [
    { path: "/login", name: "", Component: Login, isPrivate: false, exact: true },
    { path: "/project-select", name: "", Component: ProjectSelect, isPrivate: false },
    { path: "/", name: "", Component: Dashboard, isPrivate: false},
    { path: "/central-search/favourite", name: "", Component: Favourite, isPrivate: false },
    { path: "/central-search", name: "", Component: CentralSearch, isPrivate: false},
    { path: "/health-safety", name: "", Component: HealthSafety, isPrivate: false },
    { path: "/health-safety/ptw", name: "", Component: PTW, isPrivate: false },
    { path: "/health-safety/ncr", name: "", Component: NCR, isPrivate: false },
    { path: "/health-safety/gate-access", name: "", Component: GateAccess, isPrivate: false },
    { path: "/health-safety/iot", name: "", Component: Iot, isPrivate: false },
    { path: "/VWT-viewer", name: "", Component: VWTViewer, isPrivate: false}
]