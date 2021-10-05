import React from 'react'
import moment from 'moment'
import { Trans } from 'react-i18next'

const NCRColumns = [
    {
        name: <Trans i18nKey="Columns.applicant"></Trans>,
        selector: (row) => {
            return row.safety_lodged_by
        },
        id: "safety_lodged_by",
        wrap: false,
        sortable: true,
        center: true
    },
    {
        name: <Trans i18nKey="Columns.pcCompany"></Trans>,
        selector: (row) => {
            return row.company_name
        },
        id: "company_name",
        wrap: false,
        sortable: true,
        center: true
    },
    {
        name: <Trans i18nKey="Columns.type"></Trans>,
        selector: (row) => {
            return row.safety_type
        },
        id: "safety_type",
        wrap: false,
        sortable: true,
        center: true
    },
    {
        name: <Trans i18nKey="Columns.description"></Trans>,
        selector: (row) => {
            return row.safety_description
        },
        id: "safety_description",
        wrap: false,
        sortable: true,
        center: true
    },
    {
        name: <Trans i18nKey="Columns.status"></Trans>,
        selector: (row) => {
            return row.safety_status_name
        },
        id: "safety_status_name",
        wrap: false,
        sortable: true,
        center: true
    },
    {
        name: <Trans i18nKey="Columns.location"></Trans>,
        selector: (row) => {
            return row.safety_location
        },
        id: "safety_location",
        wrap: false,
        sortable: true,
        center: true
    },
    {
        name: <Trans i18nKey="Columns.time"></Trans>,
        selector: (row) => {
            return row.safety_date
        },
        id: "safety_date",
        wrap: false,
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
        wrap: false,
        sortable: true,
        center: true
    },
    {
        name: <Trans i18nKey="Columns.pcCompany"></Trans>,
        selector: (row) => {
            return row.company_name
        },
        wrap: false,
        sortable: true,
        center: true
    },
    // {
    //     name: <Trans i18nKey="Columns.type"></Trans>,
    //     selector: (row) => {
    //         return row.form_template_name
    //     },
    //     wrap: false,
    //     sortable: true,
    //     center: true
    // },
    {
        name: <Trans i18nKey="Columns.Sub-Type"></Trans>,
        selector: (row) => {
            return row.form_sub_type
        },
        wrap: false,
        sortable: true,
        center: true
    },
    {
        name: <Trans i18nKey="Columns.status"></Trans>,
        selector: (row) => {
            return row.form_status_name
        },
        wrap: false,
        sortable: true,
        center: true,
        format: (row) => {
            return <div><Trans i18nKey={row.form_status_name}></Trans></div>
        }
    },
    {
        name: <Trans i18nKey="Columns.location"></Trans>,
        selector: (row) => {
            return row.unit_level
        },
        wrap: false,
        sortable: true,
        center: true
    },
    {
        name: <Trans i18nKey="Columns.time"></Trans>,
        selector: (row) => {
            return row.form_date
        },
        wrap: false,
        sortable: true,
        center: true,
        format: (row) => {
            return (
                <div>{moment.unix(row.form_date).format("DD/MMM/YYYY")}</div>
            )
        }
    },
]


export {
    NCRColumns,
    PTWColumns
}