import { useState,useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [ready,setReady] = useState(null);

    const request = useCallback(async (url,method='GET',body=null,headers={}) => {
        setLoading(false);
        setReady(false);
        try {
            if(body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }

            // console.log(body);

            const response = await fetch(url, {method, body, headers});

            console.log(response);

            const data = response.json();

            if(!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так');
            }

            setLoading(false);
            setReady(true);

            return data;
        } catch (e) {
            setLoading(false);
            // setError(e.message);
            setError(`${e.errors[0].msg}:::::::${e.errors[1].msg}`);
            throw e;
        }
    },[])

    const clearError = useCallback(() => setError(null), []);

    return { loading, request, error, clearError,ready };
}