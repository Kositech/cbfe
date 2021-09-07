import { Trans } from 'react-i18next'
const LANGUAGE = [
    { code: "zh-hant", name: "繁" },
    { code: "zh-hans", name: "简" },
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

export default {
    LANGUAGE,
    DOWNLOAD_LINK,
    SIDE_MENU
}