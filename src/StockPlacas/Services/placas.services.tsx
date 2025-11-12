import type { IPlaca } from "../models/IPlaca";
import axios from "axios";
// const API_BASE_URL =  "http://arushap41:81/api/SMTDataBase";
const API_BASE_URL =  "https://spp.newsan.com.ar";

export class PlacasServices {   
    Url = "/api/EMPQ_Declaration"

    public GetByCodigo = (codigo: string): Promise<IPlaca> =>{
        return new Promise<IPlaca>((resolve, reject) => {
            axios
                .get<IPlaca>(`${API_BASE_URL}/GetByCodigo/${codigo}`)
                .then(function(response) {
                    resolve(response.data);
                })
                .catch (function (err) {
                    reject(err)
                })
        })
    }
}
