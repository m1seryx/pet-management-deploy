import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Petprofile.css';

function PetProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [pets, setPets] = useState([]);

  // Static data for demonstration
  useEffect(() => {
    // This would normally come from an API
    const petData = [
      {
        id: 1,
        name: "Dochi Sabuero",
        age: "1 year old",
        species: "Cat",
        breed: "Tilapia Cat",
        gender: "Female",
        weight: "2 kg",
        medicalRecords: [
          {
            type: "Dental Cleaning",
            date: "",
            diagnostic: "All teeth healthy.",
            reminder: "Continue using the toothpaste with medicine at least 2x per week"
          },
          {
            type: "Check Up",
            diagnostic: "The medical condition or reason for the visit is a, 'held ear infection', 'floating checkup', 'hip dysplasia - milk', 'Sessential allergies'",
            status: "Healthy, Treated, Reagging",
            reminder: "Fetch the cat 22 x 8 day and provide a moderate amount of frack. The vitamin provided is also needed for its health."
          }
        ],
        vaccinations: [
          {
            name: "Rabies vaccine",
            lastTaken: "10/30 TB",
            nextDate: "11/31 UT"
          }
        ]
      }
    ];
    
    setPets(petData);
  }, []);

  const openModal = (pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPet(null);
  };

  const navigate = useNavigate();

  const handleBackToProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="pet-profile-container">
      <div className="pet-profile-header">
        <button
          onClick={handleBackToProfile}
          className="back-button"
        >
          ← Back to Profile
        </button>
        <h1>Registered Pets</h1>
        <div className="pet-profile-nav">
          <button onClick={handleBackToProfile} className="nav-link active">Profile</button>
          <button onClick={() => navigate('/pet-profile')} className="nav-link">Pet Profile</button>
          <button onClick={() => navigate('/profile#appointments')} className="nav-link">Appointment</button>
          <button onClick={() => navigate('/profile#records')} className="nav-link">Pet Record</button>
        </div>
      </div>

      <div className="pets-grid">
        {pets.length > 0 ? (
          pets.map(pet => (
            <div
              key={pet.id}
              className="pet-card"
              onClick={() => openModal(pet)}
            >
              <div className="pet-avatar">
                {pet.species === 'Cat' ? '🐱' : '🐶'}
              </div>
              <div className="pet-info">
                <h3 className="pet-name">{pet.name}</h3>
                <div className="pet-details">
                  <p><strong>Weight:</strong> {pet.weight}</p>
                  <p><strong>Species:</strong> {pet.species}</p>
                  <p><strong>Breed:</strong> {pet.breed}</p>
                  <p><strong>Gender:</strong> {pet.gender}</p>
                </div>
              </div>
              <div className="view-details">Click to view details</div>
            </div>
          ))
        ) : (
          <div className="no-pets-message">
            <h3>No pets registered yet</h3>
            <p>Add your first pet to get started!</p>
          </div>
        )}
      </div>



      {/* Modal */}
      {isModalOpen && selectedPet && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>✕</button>
            
            <div className="modal-header">
              <h2>{selectedPet.name}'s Medical Record</h2>
              <div className="pet-basic-info">
                <p><strong>Age:</strong> {selectedPet.age}</p>
                <p><strong>Species:</strong> {selectedPet.species}</p>
                <p><strong>Breed:</strong> {selectedPet.breed}</p>
                <p><strong>Gender:</strong> {selectedPet.gender}</p>
              </div>
            </div>

            <div className="medical-records">
              <h3>Medical History</h3>
              
              {selectedPet.medicalRecords.map((record, index) => (
                <div key={index} className="record-section">
                  <h4>{record.type}</h4>
                  {record.date && <p><strong>Date:</strong> {record.date}</p>}
                  <p><strong>Diagnostic:</strong> {record.diagnostic}</p>
                  {record.status && <p><strong>Status:</strong> {record.status}</p>}
                  <p><strong>Reminder:</strong> {record.reminder}</p>
                </div>
              ))}
            </div>

            <div className="vaccination-records">
              <h3>Vaccination</h3>
              
              {selectedPet.vaccinations.map((vaccine, index) => (
                <div key={index} className="vaccine-section">
                  <h4>{vaccine.name}</h4>
                  <p><strong>Last taken:</strong> {vaccine.lastTaken}</p>
                  <p><strong>Next date:</strong> {vaccine.nextDate}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PetProfile;