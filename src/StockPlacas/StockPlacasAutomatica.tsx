import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
//esto antes se hacia con DatosSliceRequest, por l que hay que cambiar en todos los lados
//donde se usaba antes
import { DatosSliceRequest } from "./Reducers/DatosSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
// import { useAppDispatch } from "app/Middleware/store/store";

import { type IDatos2 } from "./models/IDatos2";
// import { IDatos } from "app/models/AOI/IDatos";
import { HeaderTablero } from "./components/HeaderTablero";
//n podemos importar Fetch API, es decir no lo podemo usar
//tampoco podemos usar useNotificarionUI

import { DatosService } from "./Services/datos.services";

import moment from "moment";

import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";

// interface Stockers {
//     datosPlacas: IDatos2[];
//     numeroStockers: string;
// }

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
        fontSize: "2rem",
        color: "white",
        fontWeight: 600,
        padding: "1.5rem 1.5rem",
        border: "0",
        borderRadius: "1rem",
        width: "20%",
        boxShadow: "rgb(12 12 12 / 89%) 0px 4px 10px 0px"
    }
}))

const StyledTableCellBlue = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
        fontSize: "2rem",
        color: "#0AE2FF",
        fontWeight: 600,
        padding: "1.5rem 1.5rem",
        border: "0",
        borderRadius: "1rem",
        width: "20%",
        boxShadow: "rgb(12 12 12 / 89%) 0px 4px 10px 0px"
    }
}))

const StyledTableCellYellow = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
        fontSize: "2rem",
        color: "#BAF321",
        fontWeight: 600,
        padding: "1.5rem 1.5rem",
        border: "0",
        borderRadius: "1rem",
        width: "20%",
        boxShadow: "rgb(12 12 12 / 89%) 0px 4px 10px 0px"
    }
}))

const StyledTableHead = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        border: "0",
        fontWeight: 900,
        padding: "1.5rem 1rem",
    }
}))



export const StockPlacasAutomaticas = () => {
    let datos:IDatos2[] = [];



    const service = new DatosService;
async function obtenerTodosLosDatosOP(OPES: string[]): Promise<IDatos2[]> {
    
    // 2.1. Mapea el array OPES a un array de Promesas: Promise<IDatos2[]>[]
    const promesasDePeticiones = OPES.map(op => service.getByIdPrueba(op));

    try {
        // 2.2. Espera a todas las Promesas. 'respuestas' es de tipo IDatos2[][]
        const respuestas: IDatos2[][] = await Promise.all(promesasDePeticiones);

        console.log("✅ Todas las peticiones completadas.");
        
        // 2.3. ¡CORRECCIÓN CLAVE! Usar .flat() para convertir IDatos2[][] a IDatos2[]
        const datosCompletos: IDatos2[] = respuestas.flat();

        // El tipo de retorno ahora coincide con IDatos2[]
        return datosCompletos;
    } catch (error) {
        console.error("❌ Una o más peticiones fallaron:", error);
        // Puedes relanzar el error o retornar un valor predeterminado
        throw error;
    }
}

        const OPES = [
        "OP-303454",
        "OP-303453",
        "OP-303254",
        "OP-303142",
        "OP-301454"
    ]
    const { control, watch } = useForm()
    // const dispatch = useAppDispatch()
    // const [datos, setDatos] = useState<IDatos2[]>([]);

    useEffect(() => {
        obtenerTodosLosDatosOP(OPES)
        .then(resultadosFinales => {
        datos = resultadosFinales;
        console.log("📦 El array final con los 5 resultados (un array por cada OP) es:");
        // Aquí tendrás un array con 5 elementos.
        // Cada elemento es el array IDatos2[] devuelto por la API.
        console.log(resultadosFinales); 
        console.log(`Total de resultados individuales: ${resultadosFinales.length}`);
    })
    .catch(error => {
        console.error("Hubo un error en el flujo general:", error);
    });


    },[])
    



    // const [datos, setDatos] = useState<IDatos2[] | null>()
    // useFetchApi<IDatos2[]>(
    //     DatosSliceRequest.GetByIdPrueba, // El Thunk a ejecutar
    //     "OP-303454",                    // Argumento: la fecha
    //     true,
    //     null,
    //     setDatos,
    //     false                           // consoleLog = true
    //     // Parámetros opcionales (activador, setearData, soloSiTrue) no usados aquí
    // );



    console.log(datos);

    const fecha = moment().format("DD/MM/YYYY")

    const watchNumeroStocker = watch('stockerNumber')

    const buscarPallet = () => {
        console.log("hola mundo")
    }

    return (
        <>
            {datos && (
    <main className={`h-full w-screen bg-blue-950`}> {/* Simplificación de la clase h-full */}
        <HeaderTablero />
        <section className="px-6">
            <div className="mt-4 w-full">
                <Controller
                    name="stockerNumber"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField {...field} className="bg-background placeholder:text-3xl" fullWidth id="stocker-number" label="Ingrese un numero de stocker" variant="outlined"/>
                    )}
                />
            </div>
            <div className="w-full flex justify-between text-white text-3xl font-medium mt-16 mb-6 items-end">
                <p className="text-5xl">ANDÓN STOCK PLACAS</p>
                <p className="text-4xl">{fecha}</p>
            </div>
            {datos && (
                <section>
                    <TableContainer component={Paper} sx={{ boxShadow: "none", backgroundColor: "#172554", paddingBottom: "1rem" }}>
                        <Table sx={{ minWidth: 650, backgroundColor: "#172554" }} aria-label="simple table">
                            <TableHead className="bg-linearGradientHeaderTable">
                                <TableRow sx={{ '&:last-child td, &:last-child th': { fontSize: "2.5rem" } }}>
                                    {/* CABECERA (HEAD) - Los 'div' de separación fueron eliminados y la separación debe aplicarse con CSS/clases a los StyledTableHead si es necesario */}
                                    <StyledTableHead align="center">MODELO</StyledTableHead>
                                    <StyledTableHead align="center">LOTE</StyledTableHead>
                                    <StyledTableHead align="center">SEMIELABORADO</StyledTableHead>
                                    <StyledTableHead align="center">OP</StyledTableHead>
                                    <StyledTableHead align="center">TIPO</StyledTableHead>
                                    <StyledTableHead align="center">CANTIDAD</StyledTableHead>
                                </TableRow>
                            </TableHead>
                            
                            {/* ¡ELIMINADO! El div className="mt-3" no puede ser hijo directo de <Table> */}
                            {/* Si necesitas espacio, aplícalo al <TableContainer> o <section> */}
                            
                            <TableBody>
                                {datos.map((elementos) => (
                                    <div key={elementos.id}>
                                        {/* ¡ELIMINADO! El div className="my-6" no puede ser hijo directo de <TableBody> o hermano de <TableRow> */}
                                        {/* Si necesitas espacio vertical entre filas, aplícalo a los márgenes/paddings de <TableRow> */}
                                        
                                        <TableRow
                                            sx={{ backgroundColor: '#243150', borderBottom: '12px solid #172554' }} /* Se agregó un borde para simular la separación vertical */
                                        >
                                            {/* CUERPO (BODY) - Los 'div' de separación entre StyledTableCell fueron eliminados */}
                                            <StyledTableCell align="center">{elementos.created_at}</StyledTableCell>
                                            <StyledTableCell align="center">{elementos.declarados}</StyledTableCell>
                                            <StyledTableCell align="center">{elementos.semielaborado}</StyledTableCell>
                                            <StyledTableCell align="center">{elementos.op}</StyledTableCell>
                                            <StyledTableCellBlue align="center">{elementos.prod_aoi}</StyledTableCellBlue>
                                            <StyledTableCellYellow align="center">{elementos.panel}</StyledTableCellYellow>
                                        </TableRow>
                                    </div>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </section>
            )}
        </section>
    </main>
)}
        </>
    )
}