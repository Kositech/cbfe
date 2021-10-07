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

let ncrByCompanyAndStatusRecentMonthsOutput = `
    previousmonth{
        company_name
        count
    }
    thismonth{
        company_name
        count
    }
`

let ncrDetailByStatusOutput = `
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

let ncrAverageResponseDayOutput = `
    status
    data{
        company_name
        average_response_day
    }
`

let ncrStatusOutput = `
    data{
        safety_status_name
        safety_status_id
    }
`

export var ncrTypesCountRecentMonthsGQL = gql`
    query ncrTypesCountRecentMonths($site: Int!, $dateTime: DateTime!){
        ncrTypesCountRecentMonths(site: $site, dateTime: $dateTime){
            ${ncrTypesCountRecentMonthsOutput}
        }
    }
`

export var ncrByCompanyAndStatusRecentMonthsGQL = gql`
    query ncrByCompanyAndStatusRecentMonths($status: String!, $site: Int!, $dateTime: DateTime!, $sort: String){
        ncrByCompanyAndStatusRecentMonths(status: $status, site: $site, dateTime: $dateTime, sort: $sort){
            ${ncrByCompanyAndStatusRecentMonthsOutput}
        }
    }
`

export var ncrDetailByStatusGQL = gql`
    query ncrDetailByStatus($site: Int!, $status: String!, $skip: Int, $take: Int){
        ncrDetailByStatus(site: $site, status: $status, skip: $skip, take: $take){
            ${ncrDetailByStatusOutput}
        }
    }
`

export var ncrAverageResponseDayGQL = gql`
    query ncrAverageResponseDay($site: Int!, $status: String!, $dateTime: DateTime!){
        ncrAverageResponseDay(site: $site, status: $status, dateTime: $dateTime){
            ${ncrAverageResponseDayOutput}
        }
    }
`

export var ncrStatusGQL = gql`
    query ncrStatus{
        ncrStatus{
            ${ncrStatusOutput}
        }
    }
`
