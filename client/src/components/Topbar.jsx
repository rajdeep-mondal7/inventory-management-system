import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Moon, Search, Sun } from 'lucide-react';
import toast from 'react-hot-toast';
import { navItems, settingsItem } from '../config/navigation';
import { useAuth } from '../context/AuthContext';
import { usePreferences } from '../context/PreferencesContext';
import AlertBell from './AlertBell';
import UserMenu from './UserMenu';
import Badge from './ui/Badge';
import IconButton from './ui/IconButton';
import Kbd from './ui/Kbd';

const initials = (name) => name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
const roleLabel = (role) => role[0].toUpperCase() + role.slice(1);
// Same role colours as the landing page; the word is always shown, never colour alone.
const ROLE_TONE = { admin: 'ok', manager: 'info', staff: 'neutral' };

export default function Topbar({ onMenu, onOpenPalette }) {
  const { user } = useAuth();
  const { prefs, setPref } = usePreferences();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const current = [...navItems, settingsItem].find((i) => (i.path === '/' ? pathname === '/' : pathname.startsWith(i.path)));

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-line bg-surface px-4 md:px-6">
      <IconButton label="Open menu" className="md:hidden" onClick={onMenu}>
        <Menu size={20} />
      </IconButton>

      <nav aria-label="Breadcrumb" className="hidden items-center gap-1.5 text-[13px] sm:flex">
        {current?.group && <span className="text-ink-soft">{current.group}</span>}
        {current?.group && <span className="text-ink-soft">›</span>}
        <span className="font-medium text-ink">{current?.label || 'StockFlow'}</span>
      </nav>

      <button
        type="button"
        onClick={onOpenPalette}
        className="ml-auto flex h-9 w-9 items-center justify-center rounded-sm border border-line text-ink-soft transition-colors hover:border-ink-soft hover:text-ink sm:w-72 sm:justify-start sm:gap-2 sm:px-3"
        aria-label="Search products and pages"
      >
        <Search size={16} />
        <span className="hidden flex-1 text-left text-[13px] sm:block">Search products, pages…</span>
        <span className="hidden sm:block"><Kbd>⌘K</Kbd></span>
      </button>

      <div className="flex items-center gap-1">
        <IconButton
          label="Toggle dark mode"
          onClick={() => {
            const next = !prefs.darkMode;
            setPref('darkMode', next);
            toast.success(next ? 'Switched to Dark mode' : 'Switched to Light mode');
          }}
        >
          {prefs.darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </IconButton>
        <AlertBell />
        <div className="mx-1 hidden h-6 w-px bg-line sm:block" />
        <div className="relative">
          <div role="group" aria-label={`Signed in as ${user.name}, ${roleLabel(user.role)}`} title={user.email} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              aria-label="Account menu"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper text-xs font-semibold text-ink transition-colors hover:bg-line"
            >
              {initials(user.name)}
            </button>
            <span className="hidden max-w-40 truncate text-[13px] font-semibold text-ink md:block">{user.name}</span>
            <Badge tone={ROLE_TONE[user.role] ?? 'neutral'}>{roleLabel(user.role)}</Badge>
          </div>
          {menuOpen && <UserMenu onClose={() => setMenuOpen(false)} align="right" />}
        </div>
      </div>
    </header>
  );
}
