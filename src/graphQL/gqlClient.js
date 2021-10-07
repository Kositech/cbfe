import { GraphQLClient, gql } from 'graphql-request'

async function gqlClientAuthRequest(query, variables){
    
    const graphQLClient = new GraphQLClient(process.env.GRAPHQL_API_URL)
    try {
        // console.log("gqlClient query", query)
        // console.log("gqlClient variables", variables)
        const data = await graphQLClient.request(query, variables)
        return data
    } catch (error){
        return error
    }
}

async function gqlClientRequest(query, variables, token, disableLog = false) {
    // console.log("TOKEN :", token)
    // console.log("GRAPHQL_API_URL: ", process.env.GRAPHQL_API_URL)
    const graphQLClient = new GraphQLClient(process.env.GRAPHQL_API_URL, {
        headers: {
            authorization: "Bearer " + token,
        },
    })

    try {
        if(!disableLog){
            // console.log("gqlClient query", query)
            // console.log("gqlClient variables", variables)
        }
        const data = await graphQLClient.request(query, variables)
        return data
    } catch (error){
        return error
    }
    
}

module.exports = {
    gqlClientAuthRequest,
    gqlClientRequest
}