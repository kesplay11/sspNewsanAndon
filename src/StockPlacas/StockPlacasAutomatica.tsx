import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
//esto antes se hacia con DatosSliceRequest, por l que hay que cambiar en todos los lados
//donde se usaba antes
import { DatosSliceRequest } from "./Reducers/DatosSlice";
import { useAppDispatch } from "../store/store";
// import { useAppDispatch } from "app/Middleware/store/store";
import { type IDatos } from "./models/IDatos";
// import { IDatos } from "app/models/AOI/IDatos";
import { HeaderTablero } from "./components/HeaderTablero";
//n podemos importar Fetch API, es decir no lo podemo usar
import useFetchApi from "./Middlewares/FetchApi";
//tampoco podemos usar useNotificarionUI

import moment from "moment";

import { Controller, useForm } from "react-hook-form";

interface Stockers {
    datosPlacas: IDatos[];
    numeroStockers: string;
}

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
    const { control, watch } = useForm()
    const dispatch = useAppDispatch()

    const { state: datos, isLoading, error } = useFetchApi<Stockers[]>(
        DatosSliceRequest.GetItemByDate, // El Thunk a ejecutar
        "2024-10-25",                    // Argumento: la fecha
        true,                            // consoleLog = true
        // Parámetros opcionales (activador, setearData, soloSiTrue) no usados aquí
    );

    const fecha = moment().format("DD/MM/YYYY")

    const watchNumeroStocker = watch('stockerNumber')

    const buscarPallet = () => {
        console.log("hola mundo")
    }

    return (
        <>
            {datos && (
                <main className={`${datos.datosPlacas.length == 0 ? "h-full" : "h-full"} w-screen bg-blue-950`}>
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
                                    <Table sx={{ minWidth: 650, backgroundColor: "#172554", }} aria-label="simple table">
                                        <TableHead className="bg-linearGradientHeaderTable">
                                            <TableRow sx={{ '&:last-child td, &:last-child th': { fontSize: "2.5rem" } }}>
                                                <StyledTableHead align="center">MODELO</StyledTableHead>
                                                <div className="mx-4"></div>
                                                <StyledTableHead align="center">LOTE</StyledTableHead>
                                                <div className="mx-4"></div>
                                                <StyledTableHead align="center">SEMIELABORADO</StyledTableHead>
                                                <div className="mx-4"></div>
                                                <StyledTableHead align="center">OP</StyledTableHead>
                                                <div className="mx-4"></div>
                                                <StyledTableHead align="center">TIPO</StyledTableHead>
                                                <div className="mx-4"></div>
                                                <StyledTableHead align="center">CANTIDAD</StyledTableHead>
                                            </TableRow>
                                        </TableHead>
                                        <div className="mt-3"></div>
                                        <TableBody>
                                            {datos.datosPlacas.map((elementos) => (
                                                <>
                                                    <div className="my-6"></div>
                                                    <TableRow
                                                        key={elementos.id}
                                                        sx={{ backgroundColor: '#243150', }}>
                                                        <StyledTableCell align="center">{elementos.modelo}</StyledTableCell>
                                                        <div className="w-8 h-24 bg-[#172554]"></div>
                                                        <StyledTableCell align="center">{elementos.lote}</StyledTableCell>
                                                        <div className="w-8 h-24 bg-[#172554]"></div>
                                                        <StyledTableCell align="center">{elementos.semielaborado}</StyledTableCell>
                                                        <div className="w-8 h-24 bg-[#172554]"></div>
                                                        <StyledTableCell align="center">{elementos.op}</StyledTableCell>
                                                        <div className="w-8 h-24 bg-[#172554]"></div>
                                                        <StyledTableCellBlue align="center">{elementos.placa}</StyledTableCellBlue>
                                                        <div className="w-8 h-24 bg-[#172554]"></div>
                                                        <StyledTableCellYellow align="center">{elementos.cantidad}</StyledTableCellYellow>
                                                    </TableRow>
                                                </>
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