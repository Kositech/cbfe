import { gql } from '@apollo/client';

let ptwDetailByTypesOutput = `
    total
    data{
        applicant
        form_id
        company_name
        form_status
        form_status_name
        form_template_name
        unit_level
        form_date
    }
`

let ptwTypesCountDailyOutput = `
    days
    data{
        dateTime
        waiting_approval
        not_cancelled
        not_approved
        cancelled
        withdrawn
        cancel_confirmed
    }
`

let ptwTypesCountDateRangeOutput = `
    type
    data{
        waiting_approval
        not_cancelled
        not_approved
        cancelled
        withdrawn
        cancel_confirmed
    }
`

export var ptwDetailByTypes = gql`
    query ptwDetailByTypes($project: Int!, $type: String!, $startDate: DateTime!, $endDate: DateTime!, $skip: Int, $take: Int){
        ptwDetailByTypes(project: $project, type: $type, startDate: $startDate, endDate: $endDate, skip: $skip, take: $take){
            ${ptwDetailByTypesOutput}
        }
    }
`

export var ptwTypesCountDaily = gql`
    query ptwTypesCountDaily($project: Int!, $type: String!, $startDate: DateTime!, $endDate: DateTime!){
        ptwTypesCountDaily(project: $project, type: $type, startDate: $startDate, endDate: $endDate) {
            ${ptwTypesCountDailyOutput}
        }
    }
`

export var  ptwTypesCountDateRange = gql`
    query ptwTypesCountDateRange($project: Int!, $type: type, $startDate: startDate, $endDate: endDate){
        ptwTypesCountDateRange(project: $project, type: $type, startDate: $startDate, endDate: $endDate){
            ${ptwTypesCountDateRangeOutput}
        }
    }
`