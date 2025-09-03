'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavButton = ({ href, children, className = '', onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        ${className}
        ${isActive ? 'text-primary font-bold' : ''}
        relative group font-rubik
      `}
    >
      <span className="relative">
        {children}
        <span className={`absolute -bottom-1 right-0 w-0 h-0.5 font-rubik bg-primary transition-all duration-300 group-hover:w-full ${isActive ? 'w-full' : ''}`} />
      </span>
    </Link>
  );
};

export default NavButton;