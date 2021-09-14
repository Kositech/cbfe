import { gql } from '@apollo/client';

let ncrTypesCountRecentMonthsOutput = `
    previousmonth{
        list_type
        count
    }
    thismonth{
        list_type
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

