// import  { type IDatos } from "../models/IDatos"
import { type IDatos2 } from "../models/IDatos2";
import axios from "axios";
const API_BASE_URL =  "http://arushap41:81/api/SMTDataBase";

export class DatosService {
    Url = "Datos";

    public getByIdPrueba = (nro_op: string): Promise<IDatos2[]> => {
        return new Promise<IDatos2[]>((resolve, reject) => {
            axios
                .get<IDatos2[]>(`${API_BASE_URL}/GetDatosOP/${nro_op}`)
                .then(function (response) {
                    resolve(response.data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    }

    public getItemsByDate = (date: string): Promise<IDatos2[]> => {
        return new Promise<IDatos2[]>((resolve, reject) => {
            axios
                .get<IDatos2[]>(`${API_BASE_URL}/GetDatosOP/${date}`)
                .then(function (response) {
                    resolve(response.data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    }
}