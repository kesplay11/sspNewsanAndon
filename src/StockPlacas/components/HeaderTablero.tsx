// import { useAppDispatch } from "../../store/store";
const API_BASE_URL =  "src\assets";

export const HeaderTablero = () => {
    return (
        <header className="w-full flex h-32 justify-between items-center px-6 bg-linearGradientHaderPage">
            <figure>
                <img className="cursor-pointer" src={`${API_BASE_URL}/images/newsan/LogoNewsanBlanco.svg`} width="120px" alt="logo newsan"/>
            </figure>
            <figure>
                <img src={`${import.meta.env.API_BASE_URL}/icons/LOGO-NUEVO-SPP.svg`} width="150px" alt="logo newsan" />
            </figure>
        </header>
    )
}