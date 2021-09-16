import { gql } from '@apollo/client';

let ncrTypesCountRecentMonthsOutput = `
    previousmonth{
        safety_type
        count
    }
    thismonth{
        safety_type
        count
    }
`

export var ncrTypesCountRecentMonths = gql`
    query ncrTypesCountRecentMonths($dateTime: DateTime!){
        ncrTypesCountRecentMonths(dateTime: $dateTime){
            ${ncrTypesCountRecentMonthsOutput}
        }
    }
`

