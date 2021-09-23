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

let ncrDetailByTypesOutput = `
    ncrData{
        safety_lodged_by
        company_name
        safety_type
        safety_description
        safety_status_name
        safety_location
        safety_date
    }
    total
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

export var ncrDetailByTypes = gql`
    query ncrDetailByTypes($status: String, $skip: Int, $take: Int){
        ncrDetailByTypes(status: $status, skip: $skip, take: $take){
            ${ncrDetailByTypesOutput}
        }
    }
`

