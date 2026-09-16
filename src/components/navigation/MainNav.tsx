import React from 'react';
import { resolvePath } from '@/lib/paths';

interface NavItem {
  label: string;
  path: string;
}

interface MainNavProps {
  currentPath: string;
  items?: NavItem[];
}

const defaultNavItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About ISAP', path: '/about' },
  { label: 'ISAP Forum 2026', path: '/forum-2026' },
  { label: 'Programme', path: '/programme' },
  { label: 'Speakers & Panel', path: '/speakers' },
  { label: 'Partners', path: '/partners' },
  { label: 'News & Updates', path: '/news' },
  { label: 'Resources', path: '/resources' },
  { label: 'Contact', path: '/contact' },
];

export const MainNav: React.FC<MainNavProps> = ({ currentPath, items = defaultNavItems }) => {
  const homeResolved = resolvePath('/');

  return (
    <nav aria-label="Primary Navigation" className="hidden xl:flex items-center gap-1 lg:gap-1.5">
      {items.map((item) => {
        const resolved = resolvePath(item.path);
        const isActive =
          resolved === homeResolved
            ? currentPath === homeResolved || currentPath === `${homeResolved}/`
            : currentPath.startsWith(resolved);

        return (
          <a
            key={item.path}
            href={resolved}
            aria-current={isActive ? 'page' : undefined}
            className={`px-3 py-2 text-[14px] lg:text-[15px] font-medium transition-colors rounded-md ${
              isActive
                ? 'text-isap-gold font-semibold bg-isap-navy-dark/40'
                : 'text-white/85 hover:text-isap-gold hover:bg-white/5'
            }`}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
};
