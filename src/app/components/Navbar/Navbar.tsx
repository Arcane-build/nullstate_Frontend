"use client";
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  useIsConnected,
  useAccounts,
  useConnectUI,
  useDisconnect,
} from "@fuels/react";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { isConnected } = useIsConnected();
  const { accounts } = useAccounts();
  const { connect } = useConnectUI();
  const { disconnect } = useDisconnect();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const address = accounts?.[0] ?? null;
  const truncatedAddr = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : null;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isUserSignedIn = status === "authenticated";
  const userImage = session?.user?.image || "/images/default-avatar.png";

  // Wallet controls JSX (used in desktop header and mobile overlay)
  const walletControls = (
    <div className="flex gap-4 items-center">
      {isUserSignedIn ? (
        <>
          {/* Show connect wallet button only if user is signed in */}
          {isConnected && address ? (
            <>
              <div className="bg-white text-black py-2 px-3 rounded-[3px] font-afacad flex items-center">
                <img src="/images/fuel.png" className="mr-2 h-6" alt="FUEL" />
                FUEL
              </div>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-[#E0CFFE] text-[#4023B5] py-2 px-3 rounded-[3px] font-afacad cursor-pointer flex items-center"
              >
                {truncatedAddr}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`ml-2 transition-transform duration-200 ${
                    isDropdownOpen ? "transform rotate-180" : ""
                  }`}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </>
          ) : (
            <button
              onClick={() => connect()}
              className="bg-[#E0CFFE] text-[#4023B5] py-2 font-semibold px-5 rounded-[3px] font-afacad cursor-pointer"
            >
              CONNECT WALLET
            </button>
          )}

          {/* User profile and dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-10"
            >
              <img
                src={userImage}
                className="rounded-full w-10 h-10 object-cover"
                alt="Profile"
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#E0CFFE] rounded-md shadow-lg py-1 z-50">
                <Link
                  href="/profile"
                  className="block w-full text-left px-4 py-2 text-[#4023B5] hover:bg-purple-100 font-afacad"
                >
                  Profile
                </Link>
                {isConnected && (
                  <button
                    onClick={() => disconnect()}
                    className="w-full text-left px-4 py-2 text-[#4023B5] hover:bg-purple-100 font-afacad"
                  >
                    Disconnect Wallet
                  </button>
                )}
                <button
                  onClick={() => signOut()}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 font-afacad flex items-center justify-between"
                >
                  <span>Sign Out</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        /* Show sign in button if user is not signed in */
        <button
          onClick={() => signIn()}
          className="bg-[#E0CFFE] text-[#4023B5] py-2 font-semibold px-5 rounded-[3px] font-afacad cursor-pointer"
        >
          SIGN IN
        </button>
      )}
    </div>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 flex items-center px-8 py-4 font-w95 transition-colors ${
          scrolled || mobileMenuOpen
            ? "bg-[rgba(0,0,0,0.75)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <Link
          href="/"
          className="text-2xl tracking-wide text-white text-[28px] pr-20"
        >
          {"{}State"}
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-16 font-afacad text-[20px]">
          <Link
            href="/collections"
            className={
              pathname === "/collections"
                ? "text-purple-500 transition-colors"
                : "text-white transition-colors"
            }
          >
            Collection
          </Link>
          <Link
            href="/mint"
            className={
              pathname === "/mint"
                ? "text-purple-500 transition-colors"
                : "text-white transition-colors"
            }
          >
            Mint NFT
          </Link>
        </nav>
        {/* Desktop Wallet Controls */}
        <div className="hidden md:block ml-auto relative" ref={dropdownRef}>
          {walletControls}
        </div>
        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden ml-auto text-white"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </header>
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-[rgba(0,0,0,0.75)] text-white flex flex-col items-center space-y-4 py-4 z-40">
          <Link
            href="/collections"
            onClick={() => setMobileMenuOpen(false)}
            className={
              pathname === "/collections"
                ? "text-purple-500 transition-colors font-afacad text-[20px]"
                : "text-white transition-colors font-afacad text-[20px]"
            }
          >
            Collection
          </Link>
          <Link
            href="/mint"
            onClick={() => setMobileMenuOpen(false)}
            className={
              pathname === "/mint"
                ? "text-purple-500 transition-colors font-afacad text-[20px]"
                : "text-white transition-colors font-afacad text-[20px]"
            }
          >
            Mint NFT
          </Link>
          <div onClick={() => setMobileMenuOpen(false)} className="mt-2">
            {walletControls}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
