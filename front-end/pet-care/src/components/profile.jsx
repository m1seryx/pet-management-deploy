import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';
import profile from '../assets/dp.png';
import notify from '../assets/notif.png';
import { User, Heart, Calendar, FileText, Mail, Edit2, PlusCircle } from 'lucide-react';
import { getUser } from '../api/authApi'; 
import {getUserPets} from '../api/petApi'
import UserPet from './UserPet';
import AppointmentSection from './UserAppointment';
import Notification from './Notification';


function UserDashboard() {
  
  
  const user = getUser();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Show initial welcome notification
  useEffect(() => {
    setNotification({
      title: 'Welcome Back!',
      message: `Hello ${user?.first_name || 'User'}! Your profile is ready.`,
      type: 'success'
    });
  }, [user?.first_name]);

  const showNotification = (title, message, type = 'info') => {
    setNotification({ title, message, type });
  };

  const handleEditProfile = () => {
    showNotification('Edit Profile', 'Profile editing feature coming soon!', 'info');
  };

  const handleAddPet = () => {
    showNotification('Add Pet', 'New pet form will open soon!', 'info');
  };

  const handleNotificationClick = () => {
    // Example schedule notifications - you can replace with real data
    const scheduleNotifications = [
      {
        title: '📅 Upcoming Appointment',
        message: 'Your pet "Buddy" has a vaccination appointment on Nov 20, 2025 at 2:00 PM',
        type: 'info'
      },
      {
        title: '⏰ Appointment Reminder',
        message: 'Grooming session for "Max" scheduled for tomorrow at 10:00 AM',
        type: 'warning'
      },
      {
        title: '✅ Appointment Completed',
        message: 'Health checkup for "Luna" was completed successfully',
        type: 'success'
      },
      {
        title: '🔔 Pending Vaccination',
        message: 'Your pet needs a booster shot. Book an appointment now!',
        type: 'warning'
      }
    ];

    // Show a random notification or cycle through them
    const randomNotification = scheduleNotifications[Math.floor(Math.random() * scheduleNotifications.length)];
    showNotification(randomNotification.title, randomNotification.message, randomNotification.type);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="app">
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          type={notification.type}
          duration={5000}
          onClose={() => setNotification(null)}
        />
      )}
      
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo">
              <div className="paw-icon">🐾</div>
            </div>
            <span className="logo-text">PetCare</span>
          </div>

          <nav className="desktop-nav">
            <a href="./UserDashboard" className="nav-link">Home</a>
            <a href="./UserDashboard" className="nav-link">Services</a>
            <a href="./UserDashboard" className="nav-link">Appointment</a>
            <a href="./UserDashboard" className="nav-link">About</a>
          </nav>

          <div className="profile">
            <button 
              className="notify-btn"
              onClick={handleNotificationClick}
              title="View schedule notifications"
            >
              <div className="notif" style={{ backgroundImage: `url(${notify})` }}></div>
            </button>
            <div className="prof" onClick={() => navigate('/profile')} style={{ backgroundImage: `url(${profile})` }}></div>
          </div>

          <button className="mobile-menu-btn" onClick={toggleMenu}>
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu">
            <a href="#home" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#about" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#services" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Services</a>
            <a href="#contact" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Contact</a>
            <div className="prof" onClick={() => navigate('/profile')} style={{ backgroundImage: `url(${profile})` }}></div>
          </div>
        )}
      </header>

      <div className="main-content">
        <aside className="sidebar">
          <ul className="sidebar-menu">
            <li>
              <a href="#profile" className="active">
                <User size={20} />
                <span>Profile</span>
              </a>
            </li>
            <li>
              <a href="#pets">
                <Heart size={20} />
                <span>Pet Profile</span>
              </a>
            </li>
            <li>
              <a href="#appointments">
                <Calendar size={20} />
                <span>Appointment</span>
              </a>
            </li>
            <li>
              <a href="#records">
                <FileText size={20} />
                <span>Pet Record</span>
              </a>
            </li>
          </ul>
        </aside>

        <div className="content-area">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar" style={{ backgroundImage: `url(${profile})` }} ></div>
              <div className="profile-info">
                <h2>{user?.first_name} {user?.last_name}</h2>
                <p className="user-id">ID: {user?.id}</p>
                <p className="user-email">
                  <Mail size={16} />
                  {user?.email}
                </p>
              </div>
              <button className="btn-edit" onClick={handleEditProfile}>
                <Edit2 size={16} />
                Edit Profile
              </button>
            </div>
          </div>

          <div className="section-title">
            <Heart size={20} />
            Registered Pets
          </div>

          <UserPet />

          <AppointmentSection/>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;