import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type IPlaca } from "../models/IPlaca";
import { PlacasServices } from "../Services/placas.services";

type GetByCodigoThunkAPI = {
    rejectValue: string;
}

const placasService = new PlacasServices();

class PlacasClassSlice {
    private service:PlacasServices;
}