import React, { useState, useEffect } from 'react';
import './AdminPanel.css';
import { API_ENDPOINTS } from '../config/api';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState(null);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState(30);

  // Check if already authenticated
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      fetchAnalytics();
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(API_ENDPOINTS.adminLogin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
        fetchAnalytics();
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async (days = selectedPeriod) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_ENDPOINTS.analytics}?days=${days}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setAnalytics(data.data);
      } else {
        setError(data.error || 'Failed to fetch analytics');
      }
    } catch (error) {
      setError('Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  const updateSubmissionStatus = async (submissionId, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_ENDPOINTS.updateSubmission}/${submissionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (data.success) {
        // Refresh analytics to show updated status
        fetchAnalytics();
      } else {
        setError(data.error || 'Failed to update status');
      }
    } catch (error) {
      setError('Failed to update status');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setAnalytics(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (status) => {
    const colors = {
      new: '#ff6b6b',
      read: '#4ecdc4',
      replied: '#45b7d1',
      archived: '#96ceb4'
    };
    return colors[status] || '#gray';
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                required
              />
            </div>
            <div className="form-group1">
              <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Portfolio Analytics Dashboard</h1>
        <div className="header-controls">
          <select 
            value={selectedPeriod} 
            onChange={(e) => {
              const days = parseInt(e.target.value);
              setSelectedPeriod(days);
              fetchAnalytics(days);
            }}
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
            <option value={365}>Last year</option>
          </select>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error-message">{error}</div>}

      {analytics && (
        <div className="analytics-content">
          {/* Summary Cards */}
          <div className="summary-cards">
            <div className="card">
              <h3>Total Submissions</h3>
              <div className="card-value">{analytics.totalSubmissions}</div>
            </div>
            <div className="card">
              <h3>Unique Domains</h3>
              <div className="card-value">{Object.keys(analytics.emailDomains).length}</div>
            </div>
            <div className="card">
              <h3>Most Common Subject</h3>
              <div className="card-value">
                {Object.keys(analytics.subjects).length > 0 
                  ? Object.entries(analytics.subjects).sort(([,a], [,b]) => b - a)[0][0]
                  : 'N/A'
                }
              </div>
            </div>
            <div className="card">
              <h3>Period</h3>
              <div className="card-value">{analytics.period}</div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="charts-section">
            <div className="chart-container">
              <h3>Daily Submissions</h3>
              <div className="daily-chart">
                {Object.entries(analytics.dailyStats).map(([date, count]) => (
                  <div key={date} className="daily-bar">
                    <div className="bar" style={{height: `${(count / Math.max(...Object.values(analytics.dailyStats))) * 100}px`}}>
                      <span className="bar-value">{count}</span>
                    </div>
                    <div className="bar-label">{new Date(date).toLocaleDateString()}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="chart-container">
              <h3>Email Domains</h3>
              <div className="domain-stats">
                {Object.entries(analytics.emailDomains)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 5)
                  .map(([domain, count]) => (
                    <div key={domain} className="domain-item">
                      <span className="domain-name">{domain}</span>
                      <span className="domain-count">{count}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Submissions Table */}
          <div className="submissions-section">
            <h3>Recent Submissions</h3>
            <div className="submissions-table">
              {analytics.submissions.map((submission) => (
                <div key={submission.id} className="submission-card">
                  <div className="submission-header">
                    <div className="submission-info">
                      <strong>{submission.name}</strong>
                      <span className="submission-email">{submission.email}</span>
                    </div>
                    <div className="submission-meta">
                      <span className="submission-date">{formatDate(submission.createdAt)}</span>
                      <select
                        value={submission.status || 'new'}
                        onChange={(e) => updateSubmissionStatus(submission.id, e.target.value)}
                        className="status-select"
                        style={{backgroundColor: getStatusColor(submission.status || 'new')}}
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>
                  <div className="submission-subject">
                    <strong>Subject:</strong> {submission.subject}
                  </div>
                  <div className="submission-message">
                    <strong>Message:</strong>
                    <p>{submission.message}</p>
                  </div>
                  {submission.ipAddress && (
                    <div className="submission-technical">
                      <small>IP: {submission.ipAddress} | User Agent: {submission.userAgent?.substring(0, 50)}...</small>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;