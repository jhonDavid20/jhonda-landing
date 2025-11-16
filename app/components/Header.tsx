'use client'

import LanguageToggle from './LanguageToggle'
import CVDownloadButton from './CVDownloadButton'

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-md z-50 px-4 py-3">
            <div className="flex justify-end lg:justify-start items-center gap-3 flex-nowrap">
                <LanguageToggle />
                <CVDownloadButton />
            </div>
        </header>
    )
}
