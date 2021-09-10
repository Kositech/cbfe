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
        name: <Trans i18nKey="side_menu.Central_Search"></Trans>, link: "#",
        sub: [
            {
                name: <Trans i18nKey="side_menu.CIA"></Trans>,               
            },
            {
                name: <Trans i18nKey="side_menu.Knowledge_Portal"></Trans>, 
                link: "#",
                sub: [
                    {name: "AAAA"},
                    {name: "BBBB"}
                ]
            }
        ]
    },
]

const NAV_TAB = [
    {name: "nav_tab.Home", link: "/", className: "nav-tab nav-tab-home" },
    {name: "nav_tab.Safety", link: "/healthy-safety/ncr", className: "nav-tab nav-tab-safety" },
    {name: "nav_tab.Database", link: "/", className: "nav-tab nav-tab-database" },
    {name: "nav_tab.VWT", link: "/", className: "nav-tab nav-tab-vwt" },
    {name: "nav_tab.GIA", link: "/", className: "nav-tab nav-tab-gia" },
]

const NCR_MENU = [
    {name: "PTW", link: "/healthy-safety/ptw", className: "cb-ncr-menu-icon cb-checklist-icon"},
    {name: "NCR", link: "/healthy-safety/ncr", className: "cb-ncr-menu-icon cb-checklist-icon"},
    {name: "Gate_Access", link: "/healthy-safety/gate-access", className: "cb-ncr-menu-icon cb-arrow-exchange-icon"},
    {name: "Iot", link: "/healthy-safety/iot", className: "cb-ncr-menu-icon cb-iot-icon"},
]

export default {
    RESPONSIVE_WIDTH,
    LANGUAGE,
    DOWNLOAD_LINK,
    SIDE_MENU,
    NAV_TAB,
    NCR_MENU
}