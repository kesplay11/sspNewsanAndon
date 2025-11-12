// import { useAppDispatch } from "../../store/store";
const API_BASE_URL =  "../../assets/";
import LogoNewsanBlanco from "../../assets/images/LogoNewsanBlanco.svg";

import LOGO_NUEVO_SPP from "../../assets/icons/LOGO-NUEVO-SPP.svg";

// `${API_BASE_URL}/images/LogoNewsanBlanco.svg`
// `${API_BASE_URL}/icons/LOGO-NUEVO-SPP.svg`
// ${import.meta.env.API_BASE_URL}

export const HeaderTablero = () => {
    return (
        <header className="w-full flex h-32 justify-between items-center px-6 bg-linearGradientHaderPage">
            <figure>
                <img className="cursor-pointer" src={LogoNewsanBlanco} width="120px" alt="logo newsan"/>
            </figure>
            <figure>
                <img src={LOGO_NUEVO_SPP} width="150px" alt="logo newsan" />
            </figure>
        </header>
    )
}