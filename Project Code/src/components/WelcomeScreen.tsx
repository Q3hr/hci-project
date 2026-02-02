import React from 'react';
import { Calculator, BookOpen, TrendingUp, Globe, GraduationCap, ArrowRight } from 'lucide-react';
import { TaskType } from '../App';

interface WelcomeScreenProps {
  onSelectTask: (task: TaskType) => void;
}

export function WelcomeScreen({ onSelectTask }: WelcomeScreenProps) {
  const tasks = [
    {
      id: 'gpa-calculation' as TaskType,
      title: 'Calculate My GPA',
      description: 'Calculate your Grade Point Average for a single semester with step-by-step breakdown',
      icon: Calculator,
      color: 'bg-blue-500',
    },
    {
      id: 'cgpa-calculation' as TaskType,
      title: 'Calculate My CGPA',
      description: 'Calculate your Cumulative GPA across multiple semesters',
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
    {
      id: 'credit-hours-role' as TaskType,
      title: 'Understanding Credit Hours',
      description: 'Learn how credit hours affect your GPA and why they matter',
      icon: BookOpen,
      color: 'bg-green-500',
    },
    {
      id: 'gpa-process' as TaskType,
      title: 'How GPA is Calculated',
      description: 'Understand the formula and process behind GPA calculation',
      icon: GraduationCap,
      color: 'bg-orange-500',
    },
    {
      id: 'international-process' as TaskType,
      title: 'International GPA Systems',
      description: 'Learn how GPA interpretation differs across countries',
      icon: Globe,
      color: 'bg-indigo-500',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl mb-4 text-gray-900">
            GPA & CGPA Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A user-friendly tool to calculate, understand, and interpret your academic performance
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl mb-2 text-gray-900">
            What would you like to do today?
          </h2>
          <p className="text-gray-600 mb-6">
            Choose a task below to get started. Don't worry, we'll guide you through each step.
          </p>

          <div className="space-y-4">
            {tasks.map((task) => {
              const Icon = task.icon;
              return (
                <button
                  key={task.id}
                  onClick={() => onSelectTask(task.id)}
                  className="w-full flex items-start gap-4 p-5 rounded-xl border-2 border-gray-200 hover:border-indigo-500 hover:shadow-md transition-all duration-200 text-left group"
                >
                  <div className={`${task.color} p-3 rounded-lg flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
                      {task.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {task.description}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                </button>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-8 text-gray-600 text-sm">
          <p>💡 Tip: If you're new to GPA calculations, start with "Understanding Credit Hours" or "How GPA is Calculated"</p>
        </div>
      </div>
    </div>
  );
}
