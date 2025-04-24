import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
                <div className="text-center sm:text-left">
                <p className="text-sm sm:text-base">TindaTrack (short for “Tindahan Tracker”)</p>
                </div>

                <div className="text-center sm:text-right mt-2 sm:mt-0">
                <p className="text-xs sm:text-sm">&copy; {new Date().getFullYear()} TindaTrack. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;