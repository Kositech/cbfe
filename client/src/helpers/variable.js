import { Trans } from 'react-i18next'

const RESPONSIVE_WIDTH = '768px';

const LANGUAGE = [
    { code: "zh-HK", name: "繁" },
    { code: "zh-cn", name: "简" },
    { code: "en", name: "English" }
]

const DOWNLOAD_LINK = [
    { link: "", img: "download_ios.png", className: "download-ios" },
    { link: "", img: "download_android.png", className: "download-android" },
    { link: "", img: "download_android_apk.png", className: "download-android-apk" },
]

const SIDE_MENU = [
    {
        name: "side_menu.CIA",
        description: "side_menu.CIA_description",
        sub: [
            { name: 'side_menu.SSF', link: "#" },
            { name: 'side_menu.TSF', link: "#" },
            { name: 'side_menu.DCS', link: "#" },
        ]
    },
    {
        name: 'side_menu.Knowledge_Portal',
        description: 'side_menu.Knowledge_Portal_description',
        link: "#",
        sub: [
            { name: "side_menu.Building_Materials", link: "#" },
            { name: "side_menu.Design_Reference_Library", link: "#" },
            { name: "side_menu.Statutory_Updates_Impact_Remarks", link: "#" },
            { name: "side_menu.Operation_Control_Reference_Systems", link: "#" },
            { name: "side_menu.Project", link: "#" },
        ]
    },
    {
        name: 'side_menu.VVMU',
        link: "#",
        description: 'side_menu.VVMU_description'
    },
    {
        name: 'side_menu.GIA',
        link: "#",
        description: 'side_menu.GIA_description'
    },
]

const NAV_TAB = [
    { name: "nav_tab.Home", link: "/", className: "nav-tab nav-tab-home" },
    { name: "nav_tab.Safety", link: "/health-safety", className: "nav-tab nav-tab-safety" },
    { name: "nav_tab.Database", link: "#", className: "nav-tab nav-tab-database" },
    { name: "nav_tab.VWT", link: "/VWT/viewer", className: "nav-tab nav-tab-vwt", target: "_blank" },
    { name: "nav_tab.GIA", link: "#", className: "nav-tab nav-tab-gia" },
]

const NCR_MENU = [
    { name: "PTW", link: "/health-safety/ptw", className: "cb-ncr-menu-icon cb-checklist-icon" },
    { name: "NCR", link: "/health-safety/ncr", className: "cb-ncr-menu-icon cb-checklist-icon" },
    { name: "Gate_Access", link: "/health-safety/gate-access", className: "cb-ncr-menu-icon cb-arrow-exchange-icon" },
    { name: "Iot", link: "/health-safety/iot", className: "cb-ncr-menu-icon cb-iot-icon" },
]

const LABEL_BOX_1 = [
    { label: "Submitted", value: 250 },
    { label: "Approved", value: 212 },
]

const LABEL_BOX_2 = [
    { label: "Submitted", value: 45 },
    { label: "Approved", value: 40 },
]

const LABEL_BOX_3 = [
    { label: "Submitted", value: 30 },
    { label: "Approved", value: 18 },
]

export default {
    RESPONSIVE_WIDTH,
    LANGUAGE,
    DOWNLOAD_LINK,
    SIDE_MENU,
    NAV_TAB,
    NCR_MENU,


    LABEL_BOX_1,
    LABEL_BOX_2,
    LABEL_BOX_3
}