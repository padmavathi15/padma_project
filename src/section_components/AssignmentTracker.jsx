import React from 'react';
import AssignmentTable from '../reusable_components/AssignmentTable';
import AssignmentModal from '../model_components/AssignmentModal';

const AssignmentTracker = () => {
  return (
    <div>
      <h2>Assignment Tracker</h2>
      <AssignmentTable />
      <AssignmentModal />
    </div>
  );
};

export default AssignmentTracker;
