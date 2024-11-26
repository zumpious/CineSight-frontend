'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItem } from './Navigation.types';
import styles from './Navigation.module.css';

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Movies', href: '/movies' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-primary-color/95 backdrop-blur supports-[backdrop-filter]:bg-primary-color/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link 
            href="/" 
            className="text-xl font-bold text-accent-color"
          >
            Cinesight
          </Link>
          
          <ul className="flex gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.navLink} ${
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
        </div>
      </div>
    </nav>
  );
}