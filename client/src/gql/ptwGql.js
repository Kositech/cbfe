import { gql } from '@apollo/client';

let ptwDetailByTypesOutput = `
    total
    data{
        applicant
        form_id
        company_name
        form_status_name
        form_template_name
        form_sub_type
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

let ptwTypesCountHourlyByDaysOutput = `
    dateTime
    hour
    waiting_approval
    not_cancelled
    not_approved
    cancelled
    cancel_confirmed
    withdrawn
`

export var ptwDetailByTypes = gql`
    query ptwDetailByTypes($site: Int!, $type: String!, $status: String!, $startDate: DateTime!, $endDate: DateTime!, $skip: Int, $take: Int){
        ptwDetailByTypes(site: $site, type: $type, status: $status, startDate: $startDate, endDate: $endDate, skip: $skip, take: $take){
            ${ptwDetailByTypesOutput}
        }
    }
`

export var ptwTypesCountDaily = gql`
    query ptwTypesCountDaily($site: Int!, $type: String!, $startDate: DateTime!, $endDate: DateTime!){
        ptwTypesCountDaily(site: $site, type: $type, startDate: $startDate, endDate: $endDate) {
            ${ptwTypesCountDailyOutput}
        }
    }
`

export var  ptwTypesCountDateRange = gql`
    query ptwTypesCountDateRange($site: Int!, $type: String!, $startDate:  DateTime!, $endDate: DateTime!){
        ptwTypesCountDateRange(site: $site, type: $type, startDate: $startDate, endDate: $endDate){
            ${ptwTypesCountDateRangeOutput}
        }
    }
`

export var ptwTypesCountHourlyByDays = gql`
    query ptwTypesCountHourlyByDays($site: Int!, $type: String!, $startDate: DateTime!, $endDate:  DateTime!){
        ptwTypesCountHourlyByDays(site: $site, type: $type, startDate: $startDate, endDate: $endDate){
            ${ptwTypesCountHourlyByDaysOutput}
        }
    }
`
