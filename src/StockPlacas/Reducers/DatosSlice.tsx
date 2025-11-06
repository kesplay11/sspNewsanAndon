import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
// Nota: Debes ajustar las rutas de importación si son diferentes en tu proyecto
// Importamos IIniState solo para referencia, aunque no la extenderemos para evitar el conflicto
// import { type IIniState } from "../models/IInistSate"; 
import { type IDatos } from "../models/IDatos";
import { DatosService } from "../Services/datos.services"; 

// --- 1. Definición de Interfaces Específicas ---

// Interfaz para el payload de GetItemByDate
interface objetoDatos {
    DatosPlacas: IDatos[];
    numerosStockers: string[]
}

// Tipo de ThunkAPI para GetByIdPrueba, necesario para el rejectValue
type GetByIdPruebaThunkAPI = {
    rejectValue: string;
}

// --- 2. Servicio y Clase de Solicitudes (Thunks) ---

const datosService = new DatosService();

/**
 * Clase contenedora de los Thunks (acciones asíncronas)
 */
class DatosClassSlice {
    private service: DatosService;

    // Nota: Eliminé la referencia a 'ThunkAPI' de la importación ya que no se usa directamente aquí
    constructor(service: DatosService) {
        this.service = service;
    }

    /**
     * Thunk para obtener un ID, gestionando el error internamente.
     */
    GetByIdPrueba = createAsyncThunk<
        IDatos, 
        number, 
        GetByIdPruebaThunkAPI 
    >(
        `Datos/getByIdPrueba`, 
        async (id, info) => {
            try {
                // Llamada directa al servicio
                const result = await this.service.getByIdPrueba(id);
                return result; 
            } catch (e: any){
                const mensaje = e.response?.data?.message || "Error al cargar datos por ID";
                // Devolvemos el mensaje de error con rejectWithValue
                return info.rejectWithValue(mensaje);
            }
        }
    );

    /**
     * Thunk para obtener ítems por fecha.
     * Dado que eliminamos errorNotification, también gestionaremos el error aquí.
     */
    GetItemByDate = createAsyncThunk<
        objetoDatos[], 
        string, 
        { rejectValue: string } 
    >(
        'Datos/getItemsByDate', 
        async (date, info) => {
            try {
                return await this.service.getItemsByDate(date);
            } catch (e: any) {
                const mensaje = e.response?.data?.message || "Error al obtener ítems por fecha";
                return info.rejectWithValue(mensaje);
            }
        }
    );
}

export const DatosSliceRequest = new DatosClassSlice(datosService);

// --- 3. Estado Inicial y Slice ---

/**
 * Interfaz explícita del estado inicial del slice, sin extender IIniState para evitar conflictos.
 */


interface DatosInitialState {
    // 💡 Tipo booleano simple para indicar si una carga está activa o no.
    loading: boolean; 
    
    // Tipo para la data individual (usada por GetByIdPrueba)
    data: IDatos | null; 

    // Tipo para la colección de datos (usada por GetItemByDate)
    dataAll: objetoDatos[] | null;
}

const initialState: DatosInitialState = {
    loading: false, // Inicialmente es false
    data: null,    // Para GetByIdPrueba
    dataAll: null  // Para GetItemByDate
}

/**
 * Slice principal para la entidad Datos.
 */
export const DatosSlice = createSlice({
    name: "Datos",
    initialState: initialState,
    reducers: {}, // Reducers síncronos
    extraReducers: (builder) => {
        // --- GetByIdPrueba ---
        builder.addCase(DatosSliceRequest.GetByIdPrueba.pending, (state) => {
            state.loading = true; // Empieza la carga (true)
        });
        builder.addCase(DatosSliceRequest.GetByIdPrueba.fulfilled, (state, action) => {
            state.loading = false; // Fin de la carga exitoso (false)
            state.data = action.payload; // Asume que IDatos es el tipo de 'data'
        });
        builder.addCase(DatosSliceRequest.GetByIdPrueba.rejected, (state) => {
            state.loading = false; // Fin de la carga con error (false)
        });
        
        // --- GetItemByDate ---
        builder.addCase(DatosSliceRequest.GetItemByDate.pending, (state) => {
            state.loading = true; // Empieza la carga (true)
        });
        builder.addCase(DatosSliceRequest.GetItemByDate.fulfilled, (state, action) => {
            state.dataAll = action.payload; 
            state.loading = false; // Fin de la carga exitoso (false)
        });
        builder.addCase(DatosSliceRequest.GetItemByDate.rejected, (state) => {
            state.loading = false; // Fin de la carga con error (false)
        });
    }
})