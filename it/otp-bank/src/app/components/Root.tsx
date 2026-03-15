import { Outlet, useLocation, useNavigate } from 'react-router';
import { Home, TrendingUp, Target, User } from 'lucide-react';

export function Root() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', icon: Home, label: 'Главная' },
    { path: '/finance', icon: TrendingUp, label: 'Финансы' },
    { path: '/modes', icon: Target, label: 'Режимы' },
    { path: '/profile', icon: User, label: 'Профиль' },
  ];

  const hideNav = ['/calendar', '/notifications'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-[#0A0A0A] relative">
      <div className={hideNav ? '' : 'pb-[70px]'}>
        <Outlet />
      </div>

      {!hideNav && (
        <nav className="fixed bottom-0 left-0 right-0 h-[70px] bg-[#0A0A0A] border-t border-[#161616] pb-2 z-50">
          <div className="flex items-center justify-around h-full max-w-[390px] mx-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all duration-200"
                >
                  <Icon
                    className={`w-6 h-6 transition-colors duration-200 ${isActive ? 'text-[#C8F135]' : 'text-[#333333]'}`}
                    strokeWidth={1.5}
                  />
                  {isActive && (
                    <div className="w-1 h-1 rounded-full bg-[#C8F135]" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}
