
export const apiResponse = async (api)=> {
    try {
        const response = await fetch(api)
        if(!response.ok) throw new Error(`HTTP: ${response.status}`)
        const data = await response.json()
        return data
    }
    catch (error) {
        console.error('APR ERROR : ',error)
        return null
    }
}