import moment from 'moment';
import { Trans } from 'react-i18next'

const RESPONSIVE_WIDTH = '768px';
const DATA_TABLE_PER_PAGE = 15;

const CHART_COLOR = [
    "#5B8FF9", "#61DDAA", "#65789B", "#F6BD16", "#CD7B7B"
]

const PTW_CHART_COLOR = ["#5B8FF9", "#CD7B7B", "#61DDAA", "#65789B", "#f2711c", "#6435c9"]
// 'company_name_asc' , 'company_name_desc', 'previousmonth_count_asc', 'previousmonth_count_desc', 'thismonth_count_asc', 'thismonth_count_desc'
const NCR_CHART_SORT = [
    {kay: "A-Z", value: "company_name_asc", text: "A-Z"},
    {kay: "Z-A", value: "company_name_desc", text: "Z-A"},
    {kay: "thismonth_count_asc", value: "thismonth_count_asc", text: <Trans i18nKey="thismonth_count_asc"></Trans>},
    {kay: "thismonth_count_desc", value: "thismonth_count_desc", text: <Trans i18nKey="thismonth_count_desc"></Trans>},
    {kay: "previousmonth_count_asc", value: "previousmonth_count_asc", text: <Trans i18nKey="previousmonth_count_asc"></Trans>},
    {kay: "previousmonth_count_desc", value: "previousmonth_count_desc", text: <Trans i18nKey="previousmonth_count_desc"></Trans>},
]

const LANGUAGE = [
    { code: "zh-HK", name: "繁" },
    { code: "zh-cn", name: "简" },
    { code: "en", name: "English" }
]

const CHART_DATE_FILTER = [
    { key: "today", value: 0, text: <Trans i18nKey="Today"></Trans>, startDays: 0, endDays: 0 },
    { key: "Last_7_days", value: 1, text: <Trans i18nKey="Last_7_days"></Trans>, startDays: 7, endDays: 0 },
    {
        key: "Last_month", value: 2, text: <Trans i18nKey="Last_month"></Trans>,
        startDays: moment().diff(moment().subtract(1,'month').startOf('month'), "days"),
        endDays: moment().diff(moment().subtract(1,'month').endOf('month'), "days") + 1,
    },
]

const DOWNLOAD_LINK = [
    { link: "", img: "download_ios.png", className: "download-ios" },
    { link: "", img: "download_android.png", className: "download-android" },
    { link: "", img: "download_android_apk.png", className: "download-android-apk" },
]

const PERMIT_TYPE = [
    "THERMAL",
    "SIDEWALK",
    "LADDER",
    "FALSECEILING"
]

const CS_TYPE = [
    { text: <Trans i18nKey="All_Type"></Trans>, value: "All", key: "all-type" },
    { text: <Trans i18nKey="TSF"></Trans>, value: "TSF", key: "tsf" },
    { text: <Trans i18nKey="DCS"></Trans>, value: "DCS", key: "dcs" },
    { text: <Trans i18nKey="SSF"></Trans>, value: "SSF", key: "ssf" },
    { text: <Trans i18nKey="MSS"></Trans>, value: "MSS", key: "mss" },
    { text: <Trans i18nKey="KP"></Trans>, value: "KP", key: "kp" }
]

const KP_FILTER = {
    "technical-data-bank": { value: "technical-data-bank" },
    "technical-training": { value: "technical-training" },
    "creativity-implementation": { value: "creativity-implementation" },
    "innovation-technology": { value: "innovation-technology" },
    "item-management": { value: "item-management" },
    "new-item": { value: "new-item" },
    "tag-management": { value: "tag-management" },
    "user-list": { value: "user-list" },
    "eplatform": { value: "eplatform" },
    "help": { value: "help" }
}

const SIDE_MENU = [
    {
        name: "Home",
        link: "/"
    },
    {
        name: "side_menu.Safety_Health",
        description: "side_menu.Safety_Health_description",
        link: "/health-safety",
        sub: [
            { name: 'side_menu.PTW', link: '/health-safety/ptw' },
            { name: 'side_menu.NCR', link: '/health-safety/ncr' },
            { name: 'side_menu.Gate_Access', link: '/health-safety/gate-access' },
            { name: 'side_menu.IoT', link: '/health-safety/iot' },
        ]
    },
    {
        name: 'side_menu.Central_Search',
        description: 'side_menu.Central_Search_description',
        link: "/central-search",
        sub: [
            { name: "side_menu.favourite", link: "/central-search/favourite#" },
            {
                name: "side_menu.CIA",
                id: "smCIA",
                sub: [
                    { name: 'side_menu.TSF', link: "/central-search?type=TSF" },
                    { name: 'side_menu.DCS', link: "/central-search?type=DCS" },
                    { name: 'side_menu.SSF', link: "/central-search?type=SSF" },
                    { name: 'side_menu.MSS', link: "/central-search?type=MSS" }
                ]
            },
            {
                name: "side_menu.Knowledge_Portal",
                id: "smKP",
                sub: [
                    { name: 'side_menu.Techincal_Data_Bank', link: "/central-seacrh?type=KP&filter=technical-data-bank" },
                    { name: 'side_menu.Technical_Training', link: "/central-seacrh?type=KP&filter=technical-training" },
                    { name: 'side_menu.Creativity_Implementation', link: "/central-seacrh?type=KP&filter=creativity-implementation" },
                    { name: 'side_menu.Innovation_Technology', link: "/central-seacrh?type=KP&filter=innovation-technology" },
                    { name: 'side_menu.Item_Management', link: "/central-seacrh?type=KP&filter=item-management" },
                    { name: 'side_menu.New_Item', link: "/central-seacrh?type=KP&filter=new-item" },
                    { name: 'side_menu.Tag_Management', link: "/central-seacrh?type=KP&filter=tag-management" },
                    { name: 'side_menu.User_List', link: "/central-seacrh?type=KP&filter=user-list" },
                    { name: 'side_menu.Eplatform', link: "/central-seacrh?type=KP&filter=eplatform" },
                    { name: 'side_menu.Help', link: "/central-seacrh?type=KP&filter=help" },
                ]
            }
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
    CHART_COLOR,
    PTW_CHART_COLOR,
    NCR_CHART_SORT,
    
    PERMIT_TYPE,
    DATA_TABLE_PER_PAGE,
    CHART_DATE_FILTER,

    RESPONSIVE_WIDTH,
    LANGUAGE,
    DOWNLOAD_LINK,
    SIDE_MENU,
    NAV_TAB,
    NCR_MENU,

    CS_TYPE,
    KP_FILTER,

    LABEL_BOX_1,
    LABEL_BOX_2,
    LABEL_BOX_3
}