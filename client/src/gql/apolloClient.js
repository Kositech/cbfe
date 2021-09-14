// import React from 'react';
// import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { debug } from '../helpers/common'

const createApolloClient = (status) => {
    // let apikeysString = localStorage.getItem("apikeys")
    // console.log("apikeysString ", apikeysString, status)
    // let apikeys = JSON.parse(apikeysString)
    // let currentStatusApiKeys = apikeys.filter(apikey => {
    //     return apikey.type === status
    // })

    // debug("REACT_APP_LOCAL_URL ", process.env.REACT_APP_LOCAL_URL)
    let url = (typeof(process.env.REACT_APP_LOCAL_URL) != "undefined" ? process.env.REACT_APP_LOCAL_URL : process.env.REACT_APP_API_URL + "/graphql" )

    // const link = createHttpLink({
    //     uri: url,
    // });

    let client = new ApolloClient({
        uri: url,
        cache: new InMemoryCache(),
        // headers: {
        //     "X-Api-Key": currentStatusApiKeys[0].key
        // }
    })

    return client;
}

async function _gqlMutate(mutation, variables = {}, status) {
    let client = createApolloClient(status)
    let result
    try {
        result = await client.mutate({
            mutation: mutation,
            variables: variables
        })

        debug("mutation ", result)

        return result
    } catch (e) {
        debug("_gqlMutate", e)
    }


    client.stop()

}

async function _gqlQuery(query, variables = {}, status) {
    let client = createApolloClient(status)

    let result
    try {
        result = await client.query({
            query: query,
            variables: variables
        })
        return result
    } catch (e) {
        debug("_gqlQuery ", e)
    }

    client.stop();
}

// async function _gqlmutate(mutate,)

export { createApolloClient, _gqlQuery, _gqlMutate } 