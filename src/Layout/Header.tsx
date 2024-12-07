import {NavLink, Outlet} from "react-router-dom";
import SramLogo from "/sram-logo.png";

export default function Header(): JSX.Element {
    return (
        <>
            <header className="prose max-w-none absolute z-50 bg-black/60 w-full flex gap-6 items-center py-4 px-8">
                <img src={SramLogo} alt="S. R. A. M. Logo" className="h-12"/>
                <h2 className="text-white mb-0 font-poppins font-bold text-3xl tracking-tighter">S. R. A. M.</h2>
                <nav className="text-white ml-auto text-xl justify-end flex flex-wrap gap-10 font-semibold">
                    <NavLink className={({isActive, isPending}) =>
                        isPending ? "text-orange-300" : isActive ? "text-orange-600" : ""
                    } to="/dashboard">Panel</NavLink>
                    <NavLink className={({isActive, isPending}) =>
                        isPending ? "text-orange-300" : isActive ? "text-orange-700" : ""
                    } to="/reports">Raporty</NavLink>
                    <NavLink className={({isActive, isPending}) =>
                        isPending ? "text-orange-300" : isActive ? "text-orange-700" : ""
                    } to="/storage">Magazyn</NavLink>
                </nav>
            </header>
            <Outlet/>
        </>
    );
}