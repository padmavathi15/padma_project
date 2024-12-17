import React, { useState } from 'react';
import data from '../data/data.json'; // Import the JSON file

const ClassroomOverview = () => {
  const [selectedClass, setSelectedClass] = useState(data.classrooms[0].id);
  const [selectedSection, setSelectedSection] = useState(data.classrooms[0].sections[0]);

  const calculateGrade = (marks) => {
    if (marks >= 90) return 'A';
    if (marks >= 70) return 'B';
    if (marks >= 50) return 'C';
    if (marks >= 30) return 'D';
    return 'F';
  };

  const calculateAverageAttendance = (attendance) => {
    const totalDays = Object.keys(attendance[0]?.attendance || {}).length;
    return attendance.map((student) => ({
      id: student.id,
      name: student.name,
      average:
        (Object.values(student.attendance).filter((status) => status === 'Present').length / totalDays) * 100,
    }));
  };

  const handleRowButtonClick = (message) => {
    alert(message);
  };

  return (
    <div className="p-4">
      <h2>Classroom Overview</h2>

      {/* Class Selection */}
      <div className="mb-3">
        <label htmlFor="classSelect" className="form-label">
          Select Class:
        </label>
        <select
          id="classSelect"
          className="form-select"
          value={selectedClass}
          onChange={(e) => setSelectedClass(Number(e.target.value))}
        >
          {data.classrooms.map((classroom) => (
            <option key={classroom.id} value={classroom.id}>
              {classroom.name}
            </option>
          ))}
        </select>
      </div>

      {/* Section Selection */}
      <div className="mb-3">
        <label htmlFor="sectionSelect" className="form-label">
          Select Section:
        </label>
        <select
          id="sectionSelect"
          className="form-select"
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
        >
          {data.classrooms
            .find((classroom) => classroom.id === selectedClass)
            .sections.map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
        </select>
      </div>

      {/* Student Marks */}
      <h4>Student Marks</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Grade</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.students[selectedClass][selectedSection].map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.subject}</td>
              <td>{calculateGrade(student.marks)}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    handleRowButtonClick(
                      `Marks Details:\nName: ${student.name}, ID: ${student.id}, Subject: ${student.subject}, Grade: ${calculateGrade(student.marks)}`
                    )
                  }
                >
                  Send
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Attendance Details */}
      <h4>Attendance Details</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Attendance (Day-wise)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.attendance[selectedClass][selectedSection].map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>
                {Object.entries(student.attendance).map(([day, status]) => (
                  <div key={day}>
                    {day}: {status}
                  </div>
                ))}
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    handleRowButtonClick(
                      `Attendance Details:\nName: ${student.name}, ID: ${student.id}, Attendance: ${JSON.stringify(
                        student.attendance,
                        null,
                        2
                      )}`
                    )
                  }
                >
                  Send
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Average Attendance */}
      <h4>Average Attendance</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Average Attendance (%)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {calculateAverageAttendance(data.attendance[selectedClass][selectedSection]).map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.average.toFixed(2)}%</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    handleRowButtonClick(
                      `Average Attendance Details:\nName: ${student.name}, ID: ${student.id}, Average Attendance: ${student.average.toFixed(
                        2
                      )}%`
                    )
                  }
                >
                  Send
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassroomOverview;
