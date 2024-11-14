import {useEffect, useState} from "react";
import {toast} from "sonner";

export const useFetch = (func, query = {}, load = true) => {
    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState(load)
    const [error, setError] = useState('')
    const [params, setParams] = useState(query)

    useEffect(() => {
        if (load) {
            getData(params)
        }
    }, []);

    const getData = (query) => {
        setLoading(true)
        setError('')
        setParams({...params, ...query})
        func({...params, ...query}).then(({error, data, msg}) => {
            setLoading(false)
            if (error === false) {
                setData(data)
            } else {
                setData(undefined)
                setError(msg)
            }
        }).catch(() => {
            setData(undefined)
            // console.log(e)
        })
    }
    const clear = () => setData(undefined)
    return [data, getData, {query: params, loading, error, clear}];
}


interface IUseAction {
    (func: any, data: any, onSuccess: any, onError?: any, successAlert?: boolean, successMsg?: string): Promise<void>
}

export const useAction: IUseAction = async (func, data, onSuccess, onError, successAlert = true, successMsg) => {
    const {error, msg, data: d} = await func({...data})
    if (error === false) {
        if (onSuccess) {
            onSuccess(d)
        }
        if (successAlert) {
            toast.success(successMsg || msg || 'Success', {
                position: "top-right",
                duration: 3000
            })
        }
    } else {
        if (onError) {
            onError(d)
        }
        toast.error(msg || 'Error', {
            position: "top-right",
            duration: 3000
        })
    }
}


export const userOutSideClick = (ref, func) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                func && func()
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}