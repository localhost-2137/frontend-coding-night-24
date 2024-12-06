import { Outlet } from "react-router-dom";
import SramLogo from "/sram-logo.png";

export default function Header(): JSX.Element {
  return (
    <>
      <header className="prose max-w-none absolute flex gap-6 items-center py-4 px-8">
        <img src={SramLogo} alt="S. R. A. M. Logo" className="h-12" />
        <h2 className="text-white mb-0 font-poppins font-bold text-3xl tracking-tighter">S. R. A. M.</h2>
      </header>
      <Outlet />
    </>
  );
}