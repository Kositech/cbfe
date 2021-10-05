import { useState, useEffect, useCallback } from 'react'
import { _gqlQuery } from '../gql/apolloClient'
import { ncrStatusGQL } from '../gql/ncrGql'
import { objArrayToDropdownObject } from '../helpers/common'

function useNCRStatus() {
    const [ncrStatus, setncrStatus] = useState([])

    async function fetchNCRStatus() {
        let items = await _gqlQuery(ncrStatusGQL, {}, {})
        // console.log("useNCRStatus fetchNCRStatus", items)
        if (typeof (items.errors) !== "undefined") {

        } else {
            var options = [{ key: 'ALL', value: -99, text: "ALL" },
            ...objArrayToDropdownObject(items.data.ncrStatus[0].data, ['safety_status_name', 'safety_status_id', 'safety_status_name'])]
            setncrStatus(options)
        }
    }

    useEffect(() => {
        console.log("fetchNCRStatus")
        fetchNCRStatus()

    }, [])

    return [ncrStatus, setncrStatus]
}

export default useNCRStatus
