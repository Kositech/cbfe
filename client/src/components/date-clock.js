import React, { useState, useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import moment from 'moment';

function DateClock(props) {
    const { t } = useTranslation();
    const [clock, setClock] = useState(new moment())

    const fontSize = (typeof(props.fontSize) !== "undefined") ? props.fontSize : 16

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
            <div className="bold deep-dark ml-2 pl-1" style={{fontSize: fontSize + "px"}}>
                {<Trans i18nKey="cb_clock"
                    components={[clock.format('YYYY'),
                    clock.format('M'), clock.format('D'),
                    t('weekdaysShort.' + clock.format('ddd')), clock.format('HH'),
                    clock.format('mm'), clock.format('ss')]}
                ></Trans>}
            </div>
        </div>
    )
}

export default DateClock