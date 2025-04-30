import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import NavbarMobile from "./NavbarMobile";

export default function HeaderMobile() {
    const [isOpen, setIsOpen] = useState(true);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <header className="header-mobile">
                <h2 className="header-mobile__brand-logo">
                    M<span>A</span>RC<span>A</span>
                </h2>
                <IoMenu
                    className="header-mobile__menu-logo"
                    onClick={toggleMenu}
                />
            </header>
            <NavbarMobile isOpen={isOpen} toggleMenu={toggleMenu} />
        </>
    );
}
