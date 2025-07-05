import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location    = useLocation();
  const isChatPage  = location.pathname?.startsWith("/chat");

  const { logoutMutation } = useLogout();

  /* — Icon‑button utility — */
  const iconBtn =
    "inline-flex items-center justify-center rounded-full p-2 transition hover:bg-gray-200/60 focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <nav className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-lg ring-1 ring-gray-100">
      <div className="h-full container mx-auto flex items-center px-4 sm:px-6 lg:px-8">
        {/* Logo (only on chat pages) */}
        {isChatPage && (
          <Link to="/" className="flex items-center gap-2.5">
            <ShipWheelIcon className="w-8 h-8 text-indigo-600" />
            <span className="text-2xl font-extrabold font-mono bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-500 tracking-widest">
              ConnectX
            </span>
          </Link>
        )}

        {/* Spacer */}
        <div className="ml-auto flex items-center gap-4">
          {/* Notifications */}
          <Link to="/notifications" className={iconBtn} aria-label="Notifications">
            <BellIcon className="h-6 w-6 text-gray-600" />
          </Link>

          {/* Avatar */}
          <div className="h-9 w-9 rounded-full overflow-hidden">
            <img
              src={authUser?.profilePic || "/placeholder-avatar.png"}
              alt="User Avatar"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Logout */}
          <button onClick={logoutMutation} className={iconBtn} aria-label="Logout">
            <LogOutIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
