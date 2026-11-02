import { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext.tsx";
import { Logo } from "../Logo/index.tsx";
import styles from "./navbar.module.css";

export function Navbar() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    auth?.logout();
    navigate("/login");
  }

  const userInitial = auth?.user?.name
    ? auth.user.name.charAt(0).toUpperCase()
    : "?";

  return (
    <aside className={styles.navbar}>
      <div className={styles.topGroup}>
        <Link to="/" className={styles.brand}>
          <Logo size={32} />
          <span className={styles.brandName}>XGames</span>
        </Link>

        <nav className={styles.navLinks}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
          >
            <svg
              className={styles.icon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1V9.5z" />
            </svg>
            <span className={styles.label}>Início</span>
          </NavLink>

          <NavLink
            to="/post"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
          >
            <svg
              className={styles.icon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            <span className={styles.label}>Publicar</span>
          </NavLink>

          {!auth?.user && (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${styles.navItem} ${isActive ? styles.active : ""}`
                }
              >
                <svg
                  className={styles.icon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                <span className={styles.label}>Entrar</span>
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `${styles.navItem} ${isActive ? styles.active : ""}`
                }
              >
                <svg
                  className={styles.icon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <line x1="20" y1="8" x2="20" y2="14" />
                  <line x1="23" y1="11" x2="17" y2="11" />
                </svg>
                <span className={styles.label}>Criar conta</span>
              </NavLink>
            </>
          )}
        </nav>
      </div>

      {auth?.user && (
        <div className={styles.userSection}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>{userInitial}</div>
            <div className={styles.userMeta}>
              <span className={styles.userName}>{auth.user.name}</span>
              <span className={styles.userHandle}>@{auth.user.username}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className={styles.logoutBtn}
            title="Sair"
          >
            <svg
              className={styles.icon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span className={styles.logoutText}>Sair</span>
          </button>
        </div>
      )}
    </aside>
  );
}
