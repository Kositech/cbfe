import React, { useState, useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import moment from 'moment';

function DateClock(props) {
    const { t, i18n } = useTranslation();
    const [clock, setClock] = useState(new moment())

    useEffect(() => {
        const interval = setInterval(() => {
            setClock(new moment())
        }, 1000)

        return () => {
            clearInterval(interval);
        }
    }, [])

    return (
        <div className="cb-clock-wrap">
            <div className="bold font-28 deep-dark ml-2 pl-1">
                {<Trans i18nKey="cb_clock"
                    components={[clock.format('YYYY'),
                    clock.format('M'), clock.format('D'),
                    clock.locale('zh-HK').format('ddd'), clock.format('HH'),
                    clock.format('mm'), clock.format('ss')]}
                ></Trans>}
            </div>
        </div>
    )
}

export default DateClock