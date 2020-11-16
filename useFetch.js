import { useEffect, useRef, useState } from "react";

const useFetch = (url) => {

    //Mantiene la referencia cuando el hook esta vivo 
    //o cuando el componente que lo usa sigue montado.
    //Al usar useRef, cuando se le quiera cambiar el valor al isMounted
    //no se vuelve a renderizar el componente, solo se mantieene la referencia al valor
    const isMounted = useRef(true);

    const [state, setState] = useState({ data: null, loading: true, error: null });

    useEffect(() => {

        //el return se lanza cuando el componente se desmonta
        return () => {
            isMounted.current = false;
        }
    }, [])

    useEffect(() => {

        setState({ data: null, loading: true, error: null });
        fetch(url)
            .then(resp => resp.json())
            .then(data => {

                //si se cierra la aplicacion antes de hacer el cambio de estado
                //el componente que se esta usando no se encuentra montando
                //por lo tanto genera un error: loop, memoria, entre otros
                if (isMounted.current) {
                    setState({
                        loading: false,
                        error: null,
                        data
                    })
                }



            })
            .catch(() => {
                setState({
                    data: null,
                    loading: false,
                    error: 'No sé pudo cargar la info'
                })
            })
    }, [url])


    return state;
}

export default useFetch;