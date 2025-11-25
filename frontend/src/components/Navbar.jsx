import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";

export default function NavBar() {
  const [me, setMe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    API.me().then((res) => { if (mounted) setMe(res); }).catch(()=>{});
    return () => { mounted = false; };
  }, []);

  function signOut() {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <header className="navbar glass">
      <nav>
        <NavLink to="/home" className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>Home</NavLink>
        <NavLink to="/avatars" className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>Avatars</NavLink>
        <NavLink to="/convai" className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>Convai</NavLink>
        <NavLink to="/portal" className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>AI Business Card</NavLink>
        <NavLink to="/target-images" className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>Target Images</NavLink>
        <NavLink to="/admin" className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>Admin</NavLink>

        <div style={{ marginLeft: "auto", display:"flex", alignItems:"center", gap:12, flexWrap: "wrap" }}>
          {me && (
            <>
              <div className="muted" style={{fontSize:14, whiteSpace: "nowrap"}}>
                Welcome, <strong>{me.name || me.email}</strong>
              </div>
              <div className="badge badge-primary" style={{ whiteSpace: "nowrap" }}>
                <strong>Code:</strong>&nbsp;{me.experienceId}
              </div>
            </>
          )}
          <button className="btn btn-ghost btn-pill" onClick={signOut} style={{ whiteSpace: "nowrap" }}>Sign out</button>
        </div>
      </nav>
    </header>
  );
}