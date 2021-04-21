import userSWR from 'swr'

export function userFetch( url:string) {
    const {data, error} = userSWR(url, async url =>{
        const response = await fetch(url);
        const data = await response.json();

        return data;
    })

    return {data, error}
}

