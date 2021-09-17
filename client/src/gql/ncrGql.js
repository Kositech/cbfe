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

let ncrByCompanyAndPeriodRecentMonthsOutput = `
    previousmonth{
        company_name
        count
    }
    thismonth{
        company_name
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

export var ncrByCompanyAndPeriodRecentMonths = gql`
    query ncrByCompanyAndPeriodRecentMonths($dateTime: DateTime!){
        ncrByCompanyAndPeriodRecentMonths(dateTime: $dateTime){
            ${ncrByCompanyAndPeriodRecentMonthsOutput}
        }
    }
`

