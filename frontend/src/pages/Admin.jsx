import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api.js";
import Navbar from "../components/Navbar.jsx";
import AdminAuthModal from "../components/AdminAuthModal.jsx";
import "../legacy-styles/business-portal.css";

export default function Admin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const authStatus = sessionStorage.getItem("adminAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      loadUsers();
    } else {
      setLoading(false);
    }
    setCheckingAuth(false);
  }, []);

  async function loadUsers() {
    try {
      const data = await API.getAllUsers();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setMsg("Failed to load users. Make sure you're logged in.");
      setLoading(false);
    }
  }

  async function deleteUser(userId, email) {
    if (!confirm(`Delete user ${email}? This cannot be undone.`)) return;
    
    try {
      await API.deleteUser(userId);
      setMsg(`User ${email} deleted successfully`);
      loadUsers();
    } catch (err) {
      setMsg(`Failed to delete user: ${err.message}`);
    }
  }

  function handleAuthenticate() {
    setIsAuthenticated(true);
    setLoading(true);
    loadUsers();
  }

  if (checkingAuth) {
    return (
      <>
        <Navbar />
        <main className="container">
          <div className="page">
            <div style={{ textAlign: "center", padding: "40px" }}>
              <div className="loading-spinner" style={{ display: "block" }}></div>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      {!isAuthenticated && <AdminAuthModal onAuthenticate={handleAuthenticate} />}
      <main className="container">
        <div className="page">
          <div className="content-area" style={{ width: "100%", maxWidth: "100%" }}>
            <h2>User Management</h2>
            {msg && <div className="alert alert-info">{msg}</div>}
            
            {loading ? (
              <div style={{ textAlign: "center", padding: "40px" }}>
                <div className="loading-spinner" style={{ display: "block" }}></div>
                <p className="muted" style={{ marginTop: "16px" }}>Loading users...</p>
              </div>
            ) : (
              <>
                <div style={{ overflowX: 'auto', marginTop: 20, width: "100%" }}>
                  <table style={{ 
                    width: '100%', 
                    minWidth: '800px',
                    borderCollapse: 'collapse'
                  }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--border)' }}>
                        <th style={{ padding: 12, textAlign: 'left', whiteSpace: 'nowrap' }}>ID</th>
                        <th style={{ padding: 12, textAlign: 'left', whiteSpace: 'nowrap' }}>Email</th>
                        <th style={{ padding: 12, textAlign: 'left', whiteSpace: 'nowrap' }}>Name</th>
                        <th style={{ padding: 12, textAlign: 'left', whiteSpace: 'nowrap' }}>Experience ID</th>
                        <th style={{ padding: 12, textAlign: 'left', whiteSpace: 'nowrap' }}>ConvAI</th>
                        <th style={{ padding: 12, textAlign: 'left', whiteSpace: 'nowrap' }}>Avatar</th>
                        <th style={{ padding: 12, textAlign: 'left', whiteSpace: 'nowrap' }}>Created</th>
                        <th style={{ padding: 12, textAlign: 'left', whiteSpace: 'nowrap' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} style={{ borderBottom: '1px solid var(--border)' }}>
                          <td style={{ padding: 12 }}>{user.id}</td>
                          <td style={{ padding: 12, whiteSpace: 'nowrap' }}>{user.email}</td>
                          <td style={{ padding: 12 }}>{user.name || '-'}</td>
                          <td style={{ padding: 12, fontWeight: 'bold' }}>{user.experienceId}</td>
                          <td style={{ padding: 12, textAlign: 'center' }}>{user.convaiId ? 'Yes' : 'No'}</td>
                          <td style={{ padding: 12, textAlign: 'center' }}>{user.rpmAvatarUrl ? 'Yes' : 'No'}</td>
                          <td style={{ padding: 12, whiteSpace: 'nowrap' }}>{new Date(user.createdAt).toLocaleDateString()}</td>
                          <td style={{ padding: 12 }}>
                            <button
                              className="btn btn-secondary"
                              style={{ padding: '6px 12px', fontSize: 12, whiteSpace: 'nowrap' }}
                              onClick={() => deleteUser(user.id, user.email)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {users.length === 0 && <p className="muted">No users found.</p>}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}