import { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel';
import i18next from "i18next";
import moment from 'moment'
// import XMLParser from 'react-xml-parser';
import axios from 'axios';
import { importAllImage } from '../helpers/common'

function Announcement(props) {
    var update = (typeof (update) !== "undefined") ? props.update : false
    
    var [announcement, setAnnouncement] = useState({
        hkorss: [],
        announcement: []
    })

    const fetchHKORSS = async () => {
        const getLanguage = () => i18next.language || window.localStorage.i18nextLng

        // let url = process.env.REACT_APP_HKO; 
        let url = "https://data.weather.gov.hk/weatherAPI/opendata/weather.php"
        let lang = 'en'
        switch (getLanguage()) {
            case "zh-HK": case "zh-hant":
                lang = 'tc'
                break;
            case "zh-CN": case "zh-hans":
                lang = 'sc'
                break;
            default:
                lang = 'en'
        }

        const response = await axios.get(url, {
            params: {
                dataType: 'warnsum',
                lang: lang
            }
        });
        // console.log("axios response", response)

        if (response.status === 200) {
            setAnnouncement({
                ...announcement,
                hkorss: response.data
            })
        }
    }

    useEffect(() => {
        fetchHKORSS()
    }, [])

    const renderHKORSS = () => {
        let layout = []

        Object.keys(announcement.hkorss).map(function (v, i) {
            let current = announcement.hkorss[v]            
            layout.push(
                <div key={"hkorss" + i} className="d-flex justify-content-between align-items-start">
                    <div className={`bold font-xm deep-dark text-left d-flex justify-content-start align-items-start`}>
                        <div className={`hko ${current.code}`}/>
                        {current.name}
                        {
                            (typeof (current.type) !== "undefined") ?
                                (<span> - {current.type}</span>) :
                                (null)
                        }
                    </div>
                    <div className="font-s gray announcement-carousel-date">{moment(current.issueTime).format("MMM DD, YYYY HH:mm:ss")}</div>
                </div>
            )
        })

        return layout
    }

    return (
        <Carousel
            autoPlay={true}
            showArrows={true}
            infiniteLoop={true}
            showStatus={false}
            showThumbs={false}
            showIndicators={false}
            dynamicHeight={true}
            className="announcement-carousel"
            axis="vertical"
        >
            {
                (Object.keys(announcement.hkorss).length > 0) ?
                    (renderHKORSS()) :
                    (null)
            }
        </Carousel>
    )
}

Announcement.getInitialProps = async ({ req }) => {
    const currentLanguage = req ? req.language : i18next.language
    console.log("log ", currentLanguage)
}

export default Announcement