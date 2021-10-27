import React from "react";

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="w-full mb-8 bottom-0 text-center">
            <p>Copyright ⓒ {currentYear}</p>
        </footer>
    );
}

export default Footer;
