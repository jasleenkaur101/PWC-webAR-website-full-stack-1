import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api.js";
import Navbar from "../components/Navbar.jsx";
import "../legacy-styles/business-portal.css";

export default function Admin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    loadUsers();
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
      loadUsers(); // Reload list
    } catch (err) {
      setMsg(`Failed to delete user: ${err.message}`);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <main className="container">
        <div className="page">
          <div className="content-area">
            <h2>User Management</h2>
            {msg && <div className="alert alert-info">{msg}</div>}
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 20 }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)' }}>
                    <th style={{ padding: 12, textAlign: 'left' }}>ID</th>
                    <th style={{ padding: 12, textAlign: 'left' }}>Email</th>
                    <th style={{ padding: 12, textAlign: 'left' }}>Name</th>
                    <th style={{ padding: 12, textAlign: 'left' }}>Experience ID</th>
                    <th style={{ padding: 12, textAlign: 'left' }}>ConvAI</th>
                    <th style={{ padding: 12, textAlign: 'left' }}>Avatar</th>
                    <th style={{ padding: 12, textAlign: 'left' }}>Created</th>
                    <th style={{ padding: 12, textAlign: 'left' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: 12 }}>{user.id}</td>
                      <td style={{ padding: 12 }}>{user.email}</td>
                      <td style={{ padding: 12 }}>{user.name || '-'}</td>
                      <td style={{ padding: 12, fontWeight: 'bold' }}>{user.experienceId}</td>
                      <td style={{ padding: 12 }}>{user.convaiId ? '✅' : '❌'}</td>
                      <td style={{ padding: 12 }}>{user.rpmAvatarUrl ? '✅' : '❌'}</td>
                      <td style={{ padding: 12 }}>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: 12 }}>
                        <button
                          className="btn btn-secondary"
                          style={{ padding: '6px 12px', fontSize: 12 }}
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
          </div>
        </div>
      </main>
    </>
  );
}