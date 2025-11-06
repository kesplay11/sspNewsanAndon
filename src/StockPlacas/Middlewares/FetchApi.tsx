import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../store/store"; // Asumiendo que esta ruta es correcta
import { useEffect, useState, useCallback } from "react";

// Nota: Hemos eliminado las importaciones de LoadingUISlice y useNotificationUI

/**
 * Hook personalizado para manejar la lógica de llamada a Redux Thunks, 
 * gestión de estados de datos, carga (loading) y errores.
 *
 * @param sliceRequest - La función AsyncThunk que se desea ejecutar.
 * @param args - Argumentos que se le pasan al Thunk.
 * @param consoleLog - Si es true, imprime la respuesta en consola.
 * @param activador - Valor que, al cambiar, dispara una nueva ejecución del Thunk (dependencia de useEffect).
 * @param setearData - Función externa opcional (setState) para actualizar datos fuera del hook.
 * @param soloSiTrue - Si es true, el Thunk solo se ejecuta si el 'activador' es un valor truthy.
 * @template T - El tipo de dato esperado de la respuesta del Thunk.
 */
export default function useFetchApi<T>(
    sliceRequest: (...args: any[]) => any, // Tipado mejorado para AsyncThunk
    args?: any, 
    consoleLog: boolean = false, 
    activador?: any, 
    setearData?: (data: T | null) => void, 
    soloSiTrue: boolean = false
) {
    const dispatch = useAppDispatch();

    // Estado local para los datos
    const [state, setState] = useState<T | null>(null);
    // 💡 Añadimos un estado de carga local para reemplazar LoadingUISlice
    const [isLoading, setIsLoading] = useState(false);
    // 💡 Añadimos un estado de error local
    const [error, setError] = useState<string | null>(null);
    
    // Función para manejar la lógica de la llamada
    const init = useCallback(async () => {
        // 💡 Limpiamos errores y activamos el estado de carga local
        setError(null);
        setIsLoading(true);

        try {
            // Nota: Aquí iba el dispatch(LoadingUISlice.actions.LoadingUIOpen("Cargando..."));

            // Despachamos el Thunk
            const resultAction = await dispatch(sliceRequest(args));
            const response: T = unwrapResult(resultAction);
            
            // Si la llamada fue exitosa:
            setState(response);
            if (setearData) {
                setearData(response);
            }

            if (consoleLog) {
                console.log("FetchApi RESPONSE:", response);
            }

        } catch (err: any) {
            // Manejo de error
            const errorMessage = typeof err === 'string' ? err : 
                                 err.message || "Error desconocido en la solicitud.";
            
            console.error("FetchApi ERROR:", errorMessage);
            setError(errorMessage);
            
            // Si el setearData existe, se le pasa null para indicar que la data falló
            if (setearData) {
                setearData(null);
            }
            // 💡 Placeholder de notificación (reemplazando useNotificationUI)
            console.log(`NOTIFICACIÓN DE ERROR: Se produjo el error ${errorMessage}`);
            
        } finally {
            // 💡 Desactivamos el estado de carga local al finalizar
            setIsLoading(false);
            // Nota: Aquí iba el dispatch(LoadingUISlice.actions.LoadingUIClose());
        }
    }, [dispatch, sliceRequest, args, consoleLog, setearData]);

    useEffect(() => {
        // Lógica de activación: se ejecuta si !soloSiTrue O si soloSiTrue es true y activador es truthy
        if (!soloSiTrue || activador) {
            init();
        }
        // Dependencias: init (para ejecutar la función), activador (para re-ejecutarla cuando cambie) y soloSiTrue
    }, [activador, soloSiTrue, init]);

    // Retornamos el estado de datos, carga y error.
    return { state, isLoading, error, setState };
}