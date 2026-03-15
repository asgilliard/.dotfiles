import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { Home, MessageCircle, Target, User } from 'lucide-react';

const F = { fontFamily: "'Onest', sans-serif" };

export function Root() {
  const location = useLocation();
  const navigate = useNavigate();
  const [notifCount] = useState(2);

  // Hide nav on full-screen sub-pages
  const hideNav = ['/modes', '/calendar', '/notifications']
    .includes(location.pathname)
    || location.pathname.startsWith('/category');

  return (
    <div className="min-h-screen bg-[#0A0A0A] relative">
      <div className={hideNav ? '' : 'pb-[70px]'}>
        <Outlet />
      </div>

      {!hideNav && (
        <nav className="fixed bottom-0 left-0 right-0 h-[70px] bg-[#0A0A0A] border-t border-[#161616] z-50">
          <div className="flex items-center h-full max-w-[390px] mx-auto">

            <NavBtn active={location.pathname === '/'} onClick={() => navigate('/')}>
              <Home className={`w-6 h-6 ${location.pathname === '/' ? 'text-[#C2FF02]' : 'text-[#333]'}`} strokeWidth={1.5} />
            </NavBtn>

            <NavBtn active={location.pathname === '/lifestyle'} onClick={() => navigate('/lifestyle')}>
              <Target className={`w-6 h-6 ${location.pathname === '/lifestyle' ? 'text-[#C2FF02]' : 'text-[#333]'}`} strokeWidth={1.5} />
            </NavBtn>

            {/* Floating center button — Modes */}
            <div className="flex-1 flex justify-center">
              <button
                onClick={() => navigate('/modes')}
                className="relative -top-4 w-14 h-14 rounded-full flex items-center justify-center active:scale-95 transition-transform"
                style={{ background: 'linear-gradient(135deg, #C2FF02 0%, #89BC00 100%)', boxShadow: '0 4px 20px rgba(194,255,2,0.35)' }}
              >
                <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="11" r="4" fill="#000"/>
                  <circle cx="11" cy="11" r="8" stroke="#000" strokeWidth="1.5"/>
                  <line x1="11" y1="0" x2="11" y2="4" stroke="#000" strokeWidth="1.5"/>
                  <line x1="11" y1="18" x2="11" y2="22" stroke="#000" strokeWidth="1.5"/>
                  <line x1="0" y1="11" x2="4" y2="11" stroke="#000" strokeWidth="1.5"/>
                  <line x1="18" y1="11" x2="22" y2="11" stroke="#000" strokeWidth="1.5"/>
                </svg>
              </button>
            </div>

            <NavBtn active={location.pathname === '/support'} onClick={() => navigate('/support')}>
              <MessageCircle className={`w-6 h-6 ${location.pathname === '/support' ? 'text-[#C2FF02]' : 'text-[#333]'}`} strokeWidth={1.5} />
            </NavBtn>

            <NavBtn active={location.pathname === '/profile'} onClick={() => navigate('/profile')}>
              <div className="relative">
                <User className={`w-6 h-6 ${location.pathname === '/profile' ? 'text-[#C2FF02]' : 'text-[#333]'}`} strokeWidth={1.5} />
                {notifCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#E05252] rounded-full flex items-center justify-center">
                    <span className="text-[9px] font-bold text-white" style={F}>{notifCount}</span>
                  </div>
                )}
              </div>
            </NavBtn>
          </div>
        </nav>
      )}
    </div>
  );
}

function NavBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className="flex-1 flex flex-col items-center justify-center gap-1 h-full py-2">
      {children}
      {active && <div className="w-1 h-1 rounded-full bg-[#C2FF02]" />}
    </button>
  );
}
