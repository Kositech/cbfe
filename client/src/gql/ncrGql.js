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

export var ncrTypesCountRecentMonths = gql`
    query ncrTypesCountRecentMonths($project: Int!, $dateTime: DateTime!){
        ncrTypesCountRecentMonths(project: $project, dateTime: $dateTime){
            ${ncrTypesCountRecentMonthsOutput}
        }
    }
`

export var ncrByCompanyAndStatusRecentMonths = gql`
    query ncrByCompanyAndStatusRecentMonths($status: String!, $project: Int!, $dateTime: DateTime!){
        ncrByCompanyAndStatusRecentMonths(status: $status, project: $project, dateTime: $dateTime){
            ${ncrByCompanyAndStatusRecentMonthsOutput}
        }
    }
`

export var ncrDetailByStatus = gql`
    query ncrDetailByStatus($project: Int!, $status: String!, $skip: Int, $take: Int){
        ncrDetailByStatus(project: $project, status: $status, skip: $skip, take: $take){
            ${ncrDetailByStatusOutput}
        }
    }
`

