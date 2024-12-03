'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from './Navigation.module.css';
import { NavItem } from './Navigation.types';

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Movies', href: '/movies' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-primary-color/95 backdrop-blur supports-[backdrop-filter]:bg-primary-color/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-3xl font-bold text-accent-color">
            CineSight
          </Link>

          {/* Desktop Navigation */}
          <ul className={`flex gap-12 ${styles.desktopNav}`}>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-3xl ${styles.navLink} ${
                    pathname === item.href
                      ? `text-accent-color ${styles.active}`
                      : 'text-text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Burger Menu Button */}
          <button
            className={styles.burgerButton}
            onClick={toggleMenu}
            data-open={isMenuOpen}
            aria-label="Toggle menu"
          >
            <span className={styles.burgerLine}></span>
            <span className={styles.burgerLine}></span>
          </button>

          {/* Mobile Navigation */}
          <div className={styles.mobileNav} data-open={isMenuOpen}>
            <ul className={styles.mobileNavList}>
              {navItems.map((item, index) => (
                <li
                  key={item.href}
                  className={styles.mobileNavItem}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <Link
                    href={item.href}
                    className={`text-3xl ${styles.navLink} ${
                      pathname === item.href
                        ? 'text-accent-color'
                        : 'text-text-primary'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
