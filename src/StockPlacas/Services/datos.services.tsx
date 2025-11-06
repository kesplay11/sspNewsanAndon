import  { type IDatos } from "../models/IDatos"
import axios from "axios";
const API_BASE_URL =  "https://spp.newsan.com.ar";

interface objetoDatos {
    DatosPlacas: IDatos[];
    numerosStockers: string[]
}

export class DatosService {
    Url = "Datos";

    public getByIdPrueba = (id: number): Promise<IDatos> => {
        return new Promise((resolve, reject) => {
            axios
                .get<IDatos>(`${API_BASE_URL}/${this.Url}/GetByIdPrueba/${id}`)
                .then(function (response) {
                    resolve(response.data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    }

    public getItemsByDate = (date: string): Promise<objetoDatos[]> => {
        return new Promise((resolve, reject) => {
            axios
                .get<objetoDatos[]>(`${API_BASE_URL}/${this.Url}/GetItemsByDate/${date}`)
                .then(function (response) {
                    resolve(response.data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    }
}