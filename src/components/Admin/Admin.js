import React, { useState } from 'react';
import { db } from '../../firebaseConfig';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

function Admin() {
    const [teacherName, setTeacherName] = useState('');
    const [classroom, setClassroom] = useState('');
    const [designation, setDesignation] = useState('');
    const [daysAvailable, setDaysAvailable] = useState('');
    const [roomDetails, setRoomDetails] = useState(null);
    const [teacherList, setTeacherList] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Add a new document with a generated ID
        const docRef = await addDoc(collection(db, 'teachers'), {
          name: teacherName,
          classroom: classroom,
          designation: designation,
          daysAvailable: daysAvailable,
        });
        console.log("Document written with ID: ", docRef.id);
  
        // Show success alert
        alert(`Teacher ${teacherName} added successfully!`);
  
        // Clear the input fields after submission
        setTeacherName('');
        setClassroom('');
        setDesignation('');
        setDaysAvailable('');
      } catch (e) {
        console.error("Error adding document: ", e);
        alert('Error adding teacher. Please try again.');
      }
    };
  
    const handleRoomClick = async (roomNumber) => {
      try {
        const q = query(collection(db, 'teachers'), where('classroom', '==', roomNumber));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          const teachers = querySnapshot.docs.map(doc => doc.data());
          setTeacherList(teachers);
          setSelectedTeacher(null);
        } else {
          alert('No details found for this room.');
          setTeacherList([]);
          setRoomDetails(null);
        }
      } catch (e) {
        console.error("Error fetching room details: ", e);
        alert('Error fetching details. Please try again.');
      }
    };
  
    const handleTeacherSelect = (teacher) => {
      setSelectedTeacher(teacher);
      setRoomDetails(teacher);
    };
  
    const handleCloseModal = () => {
      setRoomDetails(null);
      setTeacherList([]);
      setSelectedTeacher(null);
    };
  
    return (
      <div className="App">
        <h1>Add Teacher Information</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Teacher Name:</label>
            <input
              type="text"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Classroom:</label>
            <input
              type="text"
              value={classroom}
              onChange={(e) => setClassroom(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Designation:</label>
            <input
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Days Available:</label>
            <input
              type="text"
              value={daysAvailable}
              onChange={(e) => setDaysAvailable(e.target.value)}
              required
            />
          </div>
          <button type="submit">Add Teacher</button>
        </form>
  
        {/* Rectangle with rooms converted to buttons */}
        <div className="rectangle">
          <div className="floor-label">5th Floor</div>
          <div className="room-container left">
            <button className="room" onClick={() => handleRoomClick('6515')}>6515</button>
            <button className="room" onClick={() => handleRoomClick('6514')}>6514</button>
            <button className="room" onClick={() => handleRoomClick('6516')}>6516</button>
          </div>
          <div className="room-container right">
            <button className="room" onClick={() => handleRoomClick('6517')}>6517</button>
            <button className="room" onClick={() => handleRoomClick('6518')}>6518</button>
            <button className="room" onClick={() => handleRoomClick('6519')}>6519</button>
          </div>
        </div>
  
        {/* Modal for displaying room details */}
        {teacherList.length > 0 && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleCloseModal}>&times;</span>
              <h2>Room {classroom} Details</h2>
              {selectedTeacher ? (
                <>
                  <p><strong>Name:</strong> {roomDetails.name}</p>
                  <p><strong>Classroom:</strong> {roomDetails.classroom}</p>
                  <p><strong>Designation:</strong> {roomDetails.designation}</p>
                  <p><strong>Days Available:</strong> {roomDetails.daysAvailable}</p>
                </>
              ) : (
                <>
                  <p>Select a teacher:</p>
                  {teacherList.map((teacher, index) => (
                    <button key={index} onClick={() => handleTeacherSelect(teacher)}>
                      {teacher.name}
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

export default Admin