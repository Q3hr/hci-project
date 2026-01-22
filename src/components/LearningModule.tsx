import React from 'react';
import { ArrowLeft, BookOpen, GraduationCap, Globe, Calculator } from 'lucide-react';

interface LearningModuleProps {
  moduleType: 'credit-hours-role' | 'gpa-process' | 'international-process';
  onBack: () => void;
}

export function LearningModule({ moduleType, onBack }: LearningModuleProps) {
  const modules = {
    'credit-hours-role': {
      title: 'Understanding Credit Hours',
      icon: BookOpen,
      color: 'bg-green-500',
      sections: [
        {
          heading: 'What are Credit Hours?',
          content: 'Credit hours (also called credit units) represent the amount of time and effort required for a course. Typically, one credit hour equals one hour of classroom instruction per week throughout a semester.',
        },
        {
          heading: 'Why Do Credit Hours Matter?',
          content: 'Credit hours reflect the importance or weight of each course. A 3-credit course requires more time and effort than a 1-credit course, so it has a bigger impact on your GPA.',
        },
        {
          heading: 'Example: How Credit Hours Affect GPA',
          content: 'Imagine you take two courses:\n• Course A: Grade A (4.0) with 3 credit hours\n• Course B: Grade C (2.0) with 1 credit hour\n\nYour GPA = [(4.0 × 3) + (2.0 × 1)] / (3 + 1) = 14 / 4 = 3.5\n\nNotice how Course A has more influence because it has more credit hours. If both had equal credits, your GPA would be 3.0.',
        },
        {
          heading: 'Common Credit Hour Ranges',
          content: '• Lab courses: 1-2 credit hours\n• Standard lectures: 3 credit hours\n• Intensive courses: 4-5 credit hours\n• Full-time student load: 12-18 credit hours per semester',
        },
        {
          heading: 'Key Takeaway',
          content: 'Performing well in higher-credit courses has a bigger positive impact on your GPA. Similarly, poor performance in high-credit courses can significantly lower your GPA. Plan your study time accordingly!',
        },
      ],
    },
    'gpa-process': {
      title: 'How GPA is Calculated',
      icon: GraduationCap,
      color: 'bg-orange-500',
      sections: [
        {
          heading: 'The Basic GPA Formula',
          content: 'GPA = (Sum of [Grade Points × Credit Hours]) / (Total Credit Hours)\n\nThis formula gives more weight to courses with more credit hours.',
        },
        {
          heading: 'Step 1: Convert Letter Grades to Grade Points',
          content: 'Each letter grade corresponds to a grade point value on the 4.00 scale:\n• A = 4.00 (>85%)\n• A- = 3.67 (>79% to 85%)\n• B+ = 3.33 (>73% to 79%)\n• B = 3.00 (>67% to 73%)\n• B- = 2.67 (>61% to 67%)\n• C+ = 2.33 (>55% to 61%)\n• C = 2.00 (>49% to 55%)\n• D = 1.00 (40% to 49%)\n• F = 0.00 (<40%)',
        },
        {
          heading: 'Step 2: Multiply Grade Points by Credit Hours',
          content: 'For each course, multiply its grade point by its credit hours. This gives you the "quality points" for that course.\n\nExample: An A (4.0) in a 3-credit course = 4.0 × 3 = 12 quality points',
        },
        {
          heading: 'Step 3: Sum All Quality Points',
          content: 'Add up the quality points from all your courses. This total represents your academic achievement weighted by course importance.',
        },
        {
          heading: 'Step 4: Divide by Total Credit Hours',
          content: 'Divide the sum of quality points by the total credit hours. This gives you your GPA.\n\nExample:\n• Math (A, 4.0) × 3 credits = 12\n• English (B, 3.0) × 3 credits = 9\n• Lab (A, 4.0) × 1 credit = 4\nTotal: 25 quality points ÷ 7 credits = 3.57 GPA',
        },
        {
          heading: 'Understanding CGPA',
          content: 'CGPA (Cumulative GPA) is calculated the same way, but across ALL semesters. You sum up quality points from every semester and divide by total credit hours from all semesters.',
        },
      ],
    },
    'international-process': {
      title: 'International GPA Systems',
      icon: Globe,
      color: 'bg-indigo-500',
      sections: [
        {
          heading: 'Why Different Systems Exist',
          content: 'Different countries and educational systems have developed their own grading scales based on their academic traditions and assessment philosophies. There\'s no single "correct" system—each has its own logic.',
        },
        {
          heading: 'Common International Systems',
          content: '• United States: 4.0 scale (highest is 4.0)\n• United Kingdom: Class system (First Class, 2:1, 2:2, Third, Pass)\n• Germany: 1.0-5.0 scale (INVERTED—1.0 is best, 5.0 is fail)\n• Canada: 4.0 scale (similar to US)\n• Australia: 7.0 scale (highest is 7.0)\n• India: 10.0 scale (highest is 10.0)',
        },
        {
          heading: 'How Conversion Works',
          content: 'GPA conversion is typically done by:\n\n1. Converting your GPA to a percentage\n2. Mapping that percentage to the target grading scale\n3. Sometimes using official conversion tables from credential evaluation services\n\nExample: A 3.5 GPA (US) ≈ 87.5% ≈ First Class (UK) ≈ 1.7 (Germany)',
        },
        {
          heading: 'Important Considerations',
          content: '• Course rigor: Some systems consider the difficulty of courses\n• Grade inflation: Different institutions have different grading cultures\n• Official evaluations: Many universities require professional credential evaluation services like WES or ECE\n• Direct equivalency isn\'t always possible',
        },
        {
          heading: 'When You Need Conversion',
          content: '• Applying to international graduate programs\n• Scholarship applications abroad\n• International job applications\n• Academic exchange programs\n• Professional licensing in another country',
        },
        {
          heading: 'Best Practices',
          content: '1. Always check with the specific institution you\'re applying to\n2. Use their official conversion guidelines if available\n3. Consider getting a professional credential evaluation\n4. Include your percentage equivalents when applying\n5. Provide context about your institution\'s grading standards',
        },
      ],
    },
  };

  const module = modules[moduleType];
  const Icon = module.icon;

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className={`${module.color} p-3 rounded-lg`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl text-gray-900">{module.title}</h1>
              <p className="text-gray-600 text-sm">A comprehensive guide to understanding this concept</p>
            </div>
          </div>

          <div className="space-y-6">
            {module.sections.map((section, index) => (
              <div key={index} className="border-l-4 border-indigo-500 pl-6 py-2">
                <h2 className="text-xl text-gray-900 mb-3">
                  {index + 1}. {section.heading}
                </h2>
                <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {section.content}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Calculator className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-indigo-900 mb-2">Ready to Calculate?</h3>
                <p className="text-indigo-800 text-sm mb-4">
                  Now that you understand the concepts, you can calculate your GPA or CGPA with confidence.
                </p>
                <button
                  onClick={onBack}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Go to Calculator
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}