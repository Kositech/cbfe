import React from 'react'
import moment from 'moment'
import { Trans } from 'react-i18next'

const NCRColumns = [
    {
        name: <Trans i18nKey="Columns.applicant"></Trans>,
        selector: (row) => {
            return row.safety_lodged_by
        },
        wrap: true,
        sortable: true,
        center: true
    },
    {
        name: <Trans i18nKey="Columns.pcCompany"></Trans>,
        selector: (row) => {
            return row.company_name
        },
        wrap: true,
        sortable: true,
        center: true
    },
    {
        name: <Trans i18nKey="Columns.type"></Trans>,
        selector: (row) => {
            return row.safety_type
        },
        wrap: true,
        sortable: true,
        center: true
    },
    {
        name: <Trans i18nKey="Columns.description"></Trans>,
        selector: (row) => {
            return row.safety_description
        },
        wrap: true,
        sortable: true,
        center: true
    },
    {
        name: <Trans i18nKey="Columns.status"></Trans>,
        selector: (row) => {
            return row.safety_status_name
        },
        wrap: true,
        sortable: true,
        center: true
    },
    {
        name: <Trans i18nKey="Columns.location"></Trans>,
        selector: (row) => {
            return row.safety_location
        },
        wrap: true,
        sortable: true,
        center: true
    },
    {
        name: <Trans i18nKey="Columns.time"></Trans>,
        selector: (row) => {
            return row.safety_date
        },
        wrap: true,
        sortable: true,
        center: true,
        format: (row) => {
            return (
                <div>{moment.unix(row.safety_date).format("DD/MM/YYYY HH:mm")}</div>
            )
        }
    },
]

const PTWColumns = [
    {
        name: <Trans i18nKey="Columns.applicant"></Trans>,
        selector: (row) => {
            return row.applicant
        },
        wrap: true,
        sortable: true,
        center: true
    },
    {
        name: <Trans i18nKey="Columns.pcCompany"></Trans>,
        selector: (row) => {
            return row.pcCompany
        },
        wrap: true,
        sortable: true,
        center: true
    },
    {
        name: <Trans i18nKey="Columns.type"></Trans>,
        selector: (row) => {
            return row.type
        },
        wrap: true,
        sortable: true,
        center: true
    },
    {
        name: <Trans i18nKey="Columns.Sub-Type"></Trans>,
        selector: (row) => {
            return row["Sub-Type"]
        },
        wrap: true,
        sortable: true,
        center: true
    },
    {
        name: <Trans i18nKey="Columns.status"></Trans>,
        selector: (row) => {
            return row.status
        },
        wrap: true,
        sortable: true,
        center: true
    },
    {
        name: <Trans i18nKey="Columns.location"></Trans>,
        selector: (row) => {
            return row.location
        },
        wrap: true,
        sortable: true,
        center: true
    },
    {
        name: <Trans i18nKey="Columns.time"></Trans>,
        selector: (row) => {
            return row.time
        },
        wrap: true,
        sortable: true,
        center: true,
    },
]


export {
    NCRColumns,
    PTWColumns
}