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
    query ncrTypesCountRecentMonths($project: Int!, $dateTime: DateTime!){
        ncrTypesCountRecentMonths(project: $project, dateTime: $dateTime){
            ${ncrTypesCountRecentMonthsOutput}
        }
    }
`

export var ncrByCompanyAndStatusRecentMonthsGQL = gql`
    query ncrByCompanyAndStatusRecentMonths($status: String!, $project: Int!, $dateTime: DateTime!, $sort: String){
        ncrByCompanyAndStatusRecentMonths(status: $status, project: $project, dateTime: $dateTime, sort: $sort){
            ${ncrByCompanyAndStatusRecentMonthsOutput}
        }
    }
`

export var ncrDetailByStatusGQL = gql`
    query ncrDetailByStatus($project: Int!, $status: String!, $skip: Int, $take: Int){
        ncrDetailByStatus(project: $project, status: $status, skip: $skip, take: $take){
            ${ncrDetailByStatusOutput}
        }
    }
`

export var ncrAverageResponseDayGQL = gql`
    query ncrAverageResponseDay($project: Int!, $status: String!, $dateTime: DateTime!){
        ncrAverageResponseDay(project: $project, status: $status, dateTime: $dateTime){
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
