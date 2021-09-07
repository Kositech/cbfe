import { objToQueryString, debug } from './common'

const fetchDelete = async (url, params) => {
    try {
        let queryString = objToQueryString(params);
        let token = localStorage.getItem("X-CSRF-TOKEN")
        // debug(url + '?' + queryString)
        let res = await fetch(url + queryString, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': token
            }
        })
        if (res.status === 204) {
            return false
        } else {
            let results = await res.json()
            // debug(results);
            return results;
        }
    } catch (error) {
        // debug(error)
        return error
    }
}

const fetchGET = async (url, params) => {
    try {
        let queryString = objToQueryString(params);
        let token = localStorage.getItem("X-CSRF-TOKEN")
        // debug(url + '?' + queryString)
        let res = await fetch(url + queryString, {
            method: 'GET',
            headers: {
                'X-CSRF-TOKEN': token
            }
        })
        
       return res
    } catch (error) {
        // debug(error)
        return error
    }
}

const fetchPOST = async (url, body = {}, params = {}, headers = {}) => {
    try {
        let queryString = objToQueryString(params);
        let token = localStorage.getItem("X-CSRF-TOKEN")

        Object.assign(headers, {'X-CSRF-TOKEN': token})

        console.log("JSON.stringify(body)" ,url, JSON.stringify(body))

        let res = await fetch(url + queryString, {
            // mode:'no-cors',
            method: "POST",
            body: JSON.stringify(body),
            headers: headers
        })
        return res
        // let results = await res.json()
        // // debug(results);
        // return results
    } catch (error) {
        // debug(error)
        return error
    }
}

const fetchAuthPOST = async (url, body = {}, params = {}, headers = {}) => {
    try {
        let queryString = objToQueryString(params);
        console.log("fetchAuthPOST ",url, body, queryString, headers)
        let res = await fetch(url + queryString, {
            // mode:'no-cors',
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        })

        console.log("fetchAuthPOST", res)
        return res
    } catch (error) {
        console.log("fetchAuthPOST error", error)
        return error
    }
}

const fetchAuthGET = async (url, body = {}, params = {}, headers = {}) => {
    try{
        let queryString = objToQueryString(params)
        console.log("queryString", queryString, url)
        let res = await fetch(url + queryString, {
            headers: headers,
            method: "GET"
        })
        console.log("fetchAuthGET ", res)

        return res
    } catch (error){
        console.log("fetchAuthGET error", error)
        return error
    }
}

export {
    fetchGET,
    fetchPOST,
    fetchDelete,
    fetchAuthPOST,
    fetchAuthGET
}