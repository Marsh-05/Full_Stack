import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const token = localStorage.getItem('token');

  const [leaves, setLeaves] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    if (!user || !token) { navigate('/login'); return; }
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = user.role === 'ADMIN' 
        ? await axios.get('http://localhost:8080/api/leaves/all', authHeader)
        : await axios.get(`http://localhost:8080/api/leaves/user/${user.id}`, authHeader);
      setLeaves(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) handleLogout();
    }
  };

  const handleApplyLeave = async () => {
    if (!startDate || !endDate || !reason) return alert("Please fill all fields!");
    try {
      await axios.post('http://localhost:8080/api/leaves/apply', {
        userId: user.id, startDate, endDate, reason
      }, authHeader);
      setStartDate(''); setEndDate(''); setReason(''); // Clear the form
      fetchLeaves();
    } catch (error) { alert("Failed to apply for leave"); }
  };

  const handleStatusUpdate = async (leaveId, status) => {
    try {
      await axios.put(`http://localhost:8080/api/leaves/${leaveId}/status?status=${status}`, null, authHeader);
      fetchLeaves();
    } catch (error) { alert("Failed to update status"); }
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      
      {/* Header */}
      <div className="header-bar">
        <h2>Dashboard <span style={{color: '#888', fontSize: '16px'}}>| {user?.username} ({user?.role})</span></h2>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </div>

      {/* Employee Application Form */}
      {user?.role === 'EMPLOYEE' && (
        <div className="card" style={{ marginBottom: '30px' }}>
          <h3>Apply for Leave</h3>
          <div className="inline-form">
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{marginBottom: 0}} />
            <span style={{color: '#888', fontWeight: 'bold'}}>TO</span>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{marginBottom: 0}} />
            <input type="text" placeholder="Reason for leave..." value={reason} onChange={(e) => setReason(e.target.value)} style={{marginBottom: 0, flex: 2}} />
            <button className="btn-primary" onClick={handleApplyLeave} style={{width: 'auto'}}>Submit</button>
          </div>
        </div>
      )}

      {/* Leave Table */}
      <h3>Leave History</h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              {user?.role === 'ADMIN' && <th>User ID</th>}
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Status</th>
              {user?.role === 'ADMIN' && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {leaves.length === 0 ? (
              <tr><td colSpan="7" style={{textAlign: 'center', color: '#888'}}>No leave requests found.</td></tr>
            ) : (
              leaves.map((leave) => (
                <tr key={leave.id}>
                  <td>#{leave.id}</td>
                  {user?.role === 'ADMIN' && <td>User {leave.userId}</td>}
                  <td>{leave.startDate}</td>
                  <td>{leave.endDate}</td>
                  <td>{leave.reason}</td>
                  <td>
                    {/* Magical Status Badges! */}
                    <span className={`badge status-${leave.status}`}>
                      {leave.status}
                    </span>
                  </td>
                  {user?.role === 'ADMIN' && (
                    <td>
                      {leave.status === 'PENDING' ? (
                        <div style={{display: 'flex', gap: '5px'}}>
                          <button className="btn-success" onClick={() => handleStatusUpdate(leave.id, 'APPROVED')}>Approve</button>
                          <button className="btn-danger" onClick={() => handleStatusUpdate(leave.id, 'REJECTED')}>Reject</button>
                        </div>
                      ) : (
                        <span style={{color: '#ccc', fontSize: '14px'}}>Processed</span>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;