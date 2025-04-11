import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('yourCourses');

  const login = () => {
    const username = document.getElementById('username').value;
    setUser({ name: username });
  };

  const logout = () => setUser(null);

  const yourCourses = [
    { name: 'Physics 121', teacher: 'Susan Walker', time: 'TR 11:00-11:50 AM', enrolled: '5/10' },
    { name: 'CS 106', teacher: 'Ammon Hepworth', time: 'MWF 2:00-2:50 PM', enrolled: '4/10' },
  ];

  const addCourses = [
    { name: 'Math 101', teacher: 'Ralph Jenkins', time: 'MWF 10:00-10:50 AM', enrolled: '4/8' },
    { name: 'CS 162', teacher: 'Ammon Hepworth', time: 'TR 3:00-3:50 PM', enrolled: '4/4' },
  ];

  if (!user) {
    return (
      <div className="login-form">
        <h1>ABC UNIVERSITY</h1>
        <input type="text" id="username" placeholder="Username" />
        <input type="password" id="password" placeholder="Password" />
        <button onClick={login}>Sign In</button>
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className="header">
        <h2>Welcome {user.name}!</h2>
        <h3>ABC UNIVERSITY</h3>
        <button onClick={logout}>Sign out</button>
      </div>
      <div className="tabs">
        <button className={`tab-btn ${activeTab === 'yourCourses' ? 'active' : ''}`} onClick={() => setActiveTab('yourCourses')}>Your Courses</button>
        <button className={`tab-btn ${activeTab === 'addCourses' ? 'active' : ''}`} onClick={() => setActiveTab('addCourses')}>Add Courses</button>
      </div>

      {activeTab === 'yourCourses' && (
        <div>
          <h3>Your Courses</h3>
          <table>
            <thead>
              <tr><th>Course Name</th><th>Teacher</th><th>Time</th><th>Students Enrolled</th></tr>
            </thead>
            <tbody>
              {yourCourses.map((course, index) => (
                <tr key={index}>
                  <td>{course.name}</td>
                  <td>{course.teacher}</td>
                  <td>{course.time}</td>
                  <td>{course.enrolled}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'addCourses' && (
        <div>
          <h3>Add Courses</h3>
          <table>
            <thead>
              <tr><th>Course Name</th><th>Teacher</th><th>Time</th><th>Students Enrolled</th><th>Action</th></tr>
            </thead>
            <tbody>
              {addCourses.map((course, index) => (
                <tr key={index}>
                  <td>{course.name}</td>
                  <td>{course.teacher}</td>
                  <td>{course.time}</td>
                  <td>{course.enrolled}</td>
                  <td><button disabled={course.enrolled === '4/4'}>Add</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
