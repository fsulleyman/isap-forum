import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { resolvePath } from '@/lib/paths';

interface NavItem {
  label: string;
  path: string;
}

interface MobileNavProps {
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

export const MobileNav: React.FC<MobileNavProps> = ({ currentPath, items = defaultNavItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const homeResolved = resolvePath('/');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="xl:hidden flex items-center">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        className="p-2.5 rounded-lg text-white hover:text-isap-gold hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-isap-gold"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 top-[73px] z-50 bg-isap-navy-dark/95 backdrop-blur-md border-t border-white/10 flex flex-col justify-between p-6 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1 overflow-y-auto">
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
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-isap-gold/20 text-isap-gold font-semibold'
                      : 'text-white/90 hover:bg-white/5 hover:text-isap-gold'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-isap-gold"></span>}
                </a>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-white/10 mt-auto">
            <a
              href={resolvePath('/register')}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-md bg-isap-gold hover:bg-isap-gold/90 text-isap-navy-dark font-bold text-base shadow-lg transition-transform active:scale-[0.99]"
            >
              <span>Register for ISAP 2026</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-center text-xs text-isap-steel mt-3">
              Wednesday, 7 October 2026 · UPSA PCU Auditorium, Accra
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
