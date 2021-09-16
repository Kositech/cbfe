import React from 'react'
import moment from 'moment'
import { Trans } from 'react-i18next'

const NCRColumns = [
    {
        name: <Trans i18nKey="Columns.applicant"></Trans>,
        selector: (row) => {
            return row.applicant
        },
        wrap: true,
        sortable: true,
    },
    {
        name: <Trans i18nKey="Columns.pcCompany"></Trans>,
        selector: (row) => {
            return row.pcCompany
        },
        wrap: true,
        sortable: true,
    },
    {
        name: <Trans i18nKey="Columns.type"></Trans>,
        selector: (row) => {
            return row.type
        },
        wrap: true,
        sortable: true,
    },
    {
        name: <Trans i18nKey="Columns.description"></Trans>,
        selector: (row) => {
            return row.description
        },
        wrap: true,
        sortable: true,
    },
    {
        name: <Trans i18nKey="Columns.status"></Trans>,
        selector: (row) => {
            return row.status
        },
        wrap: true,
        sortable: true,
    },
    {
        name: <Trans i18nKey="Columns.location"></Trans>,
        selector: (row) => {
            return row.location
        },
        wrap: true,
        sortable: true,
    },
    {
        name: <Trans i18nKey="Columns.time"></Trans>,
        selector: (row) => {
            return row.time
        },
        wrap: true,
        sortable: true,
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
    },
    {
        name: <Trans i18nKey="Columns.pcCompany"></Trans>,
        selector: (row) => {
            return row.pcCompany
        },
        wrap: true,
        sortable: true,
    },
    {
        name: <Trans i18nKey="Columns.type"></Trans>,
        selector: (row) => {
            return row.type
        },
        wrap: true,
        sortable: true,
    },
    {
        name: <Trans i18nKey="Columns.Sub-Type"></Trans>,
        selector: (row) => {
            return row["Sub-Type"]
        },
        wrap: true,
        sortable: true,
    },
    {
        name: <Trans i18nKey="Columns.status"></Trans>,
        selector: (row) => {
            return row.status
        },
        wrap: true,
        sortable: true,
    },
    {
        name: <Trans i18nKey="Columns.location"></Trans>,
        selector: (row) => {
            return row.location
        },
        wrap: true,
        sortable: true,
    },
    {
        name: <Trans i18nKey="Columns.time"></Trans>,
        selector: (row) => {
            return row.time
        },
        wrap: true,
        sortable: true,
    },
]


export {
    NCRColumns,
    PTWColumns
}