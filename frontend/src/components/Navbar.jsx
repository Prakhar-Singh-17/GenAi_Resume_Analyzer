import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContextProvider";
import { axios } from "../utilites/axiosConfig";

function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  async function handleLogout() {
    try {
      await axios.get("/user/logout");
      setUser(null);

      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);
    }
  }

  const navLinkBase =
    "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200";
  const navLinkInactive = "text-gray-300 hover:text-white hover:bg-white/5";
  const navLinkActive =
    "bg-fuchsia-500/15 text-fuchsia-200 border border-fuchsia-400/30 shadow-sm";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#1b1430]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* LEFT: Logo + Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl text-lg font-bold text-white shadow-lg">
            <img src="logo.png" />
          </div>

          <div>
            <h1 className="text-lg font-bold text-white leading-none">
              TalentLens
            </h1>
            <p className="text-xs text-fuchsia-200 mt-1">
              AI Interview Prep & Resume Analysis
            </p>
          </div>
        </div>

        {/* CENTER: Nav links */}
        <nav className="hidden md:flex items-center gap-3">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
            }
          >
            Generate Report
          </NavLink>

          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
            }
          >
            Previous Reports
          </NavLink>
        </nav>

        {/* RIGHT: User + Logout */}
        <div className="flex items-center gap-3">
       

          <button
            onClick={handleLogout}
            className="rounded-xl border border-white/10 bg-red-500 px-4 py-2 text-sm font-medium text-gray-200 transition hover:scale-105 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {/* MOBILE NAV */}
      <div className="border-t border-white/10 px-4 pb-4 md:hidden">
        <div className="mt-3 flex gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex-1 text-center ${navLinkBase} ${
                isActive ? navLinkActive : navLinkInactive
              }`
            }
          >
            Generate
          </NavLink>

          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `flex-1 text-center ${navLinkBase} ${
                isActive ? navLinkActive : navLinkInactive
              }`
            }
          >
            Reports
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
