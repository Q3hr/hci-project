import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { GPACalculator } from './components/GPACalculator';
import { CGPACalculator } from './components/CGPACalculator';
import { LearningModule } from './components/LearningModule';

export type TaskType = 
  | 'welcome'
  | 'gpa-calculation'
  | 'cgpa-calculation'
  | 'credit-hours-role'
  | 'gpa-process'
  | 'international-process';

export default function App() {
  const [currentTask, setCurrentTask] = useState<TaskType>('welcome');

  const renderTask = () => {
    switch (currentTask) {
      case 'welcome':
        return <WelcomeScreen onSelectTask={setCurrentTask} />;
      case 'gpa-calculation':
        return <GPACalculator onBack={() => setCurrentTask('welcome')} />;
      case 'cgpa-calculation':
        return <CGPACalculator onBack={() => setCurrentTask('welcome')} />;
      case 'credit-hours-role':
        return (
          <LearningModule
            moduleType="credit-hours-role"
            onBack={() => setCurrentTask('welcome')}
          />
        );
      case 'gpa-process':
        return (
          <LearningModule
            moduleType="gpa-process"
            onBack={() => setCurrentTask('welcome')}
          />
        );
      case 'international-process':
        return (
          <LearningModule
            moduleType="international-process"
            onBack={() => setCurrentTask('welcome')}
          />
        );
      default:
        return <WelcomeScreen onSelectTask={setCurrentTask} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {renderTask()}
    </div>
  );
}
