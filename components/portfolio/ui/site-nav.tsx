import { FaBars } from "react-icons/fa";
import type { NavItem } from "@/components/portfolio/types";
import { ReactElement } from "react";

type SiteNavProps = {
    items: NavItem[];
    activeSection: string;
    mobileMenuOpen: boolean;
    onToggleMobileMenu: () => void;
    onCloseMobileMenu: () => void;
};

export function SiteNav({ items, activeSection, mobileMenuOpen, onToggleMobileMenu, onCloseMobileMenu }: SiteNavProps): ReactElement {
    return (
        <nav className="glass-nav fixed z-50 w-full border-b border-border">
            <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-4">
                <a href="#" className="border border-white px-3 py-1 font-mono text-2xl font-bold tracking-tight text-white">
                    &lt;putro /&gt;
                </a>
                <div className="hidden space-x-8 text-sm font-medium lg:flex">
                    {items.map(
                        (item: NavItem): ReactElement => (
                            <a
                                key={item.id}
                                href={item.href}
                                className={`transition-colors hover:text-white ${activeSection === item.id ? "font-bold text-white" : ""}`}
                            >
                                {item.label}
                            </a>
                        ),
                    )}
                </div>
                <button type="button" className="text-2xl text-white lg:hidden" onClick={onToggleMobileMenu} aria-label="Toggle menu">
                    <FaBars />
                </button>
            </div>
            <div
                className={`absolute w-full border-b border-border bg-bg transition-all duration-300 ease-out lg:hidden ${
                    mobileMenuOpen ? "visible opacity-100" : "invisible hidden opacity-0"
                }`}
            >
                <div className="flex flex-col space-y-4 px-4 py-4 text-lg">
                    {items.map(
                        (item: NavItem): ReactElement => (
                            <a key={item.id} href={item.href} className="block text-white" onClick={onCloseMobileMenu}>
                                {item.label}
                            </a>
                        ),
                    )}
                </div>
            </div>
        </nav>
    );
}
