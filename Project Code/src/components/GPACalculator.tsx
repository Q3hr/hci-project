import React, { useState } from 'react';
import { ArrowLeft, Calculator, Info, RotateCcw, Globe, Percent } from 'lucide-react';
import { InternationalGPAConverter } from './InternationalGPAConverter';
import { gradePoints, percentageToGrade, percentageToGradePoints, isValidPercentage, getGradeRange } from '../utils/gradeSystem';

interface GPACalculatorProps {
  onBack: () => void;
}

interface Subject {
  name: string;
  inputType: 'grade' | 'percentage';
  grade: string;
  percentage: string;
  creditHours: string;
}

export function GPACalculator({ onBack }: GPACalculatorProps) {
  const [step, setStep] = useState<'input-count' | 'input-subjects' | 'results'>('input-count');
  const [numSubjects, setNumSubjects] = useState('');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [showFormula, setShowFormula] = useState(false);
  const [showInternational, setShowInternational] = useState(false);
  const [calculatedGPA, setCalculatedGPA] = useState<number | null>(null);
  const [showGradingTable, setShowGradingTable] = useState(false);

  const handleNumSubjectsSubmit = () => {
    const num = parseInt(numSubjects);
    if (num > 0 && num <= 15) {
      const newSubjects = Array.from({ length: num }, (_, i) => ({
        name: `Subject ${i + 1}`,
        inputType: 'grade' as 'grade' | 'percentage',
        grade: '',
        percentage: '',
        creditHours: '',
      }));
      setSubjects(newSubjects);
      setStep('input-subjects');
    }
  };

  const updateSubject = (index: number, field: keyof Subject, value: string) => {
    const updated = [...subjects];
    updated[index][field] = value;
    
    // Auto-convert percentage to grade when percentage is entered
    if (field === 'percentage' && value) {
      const pct = parseFloat(value);
      if (!isNaN(pct) && isValidPercentage(pct)) {
        updated[index].grade = percentageToGrade(pct);
      }
    }
    
    setSubjects(updated);
  };

  const toggleInputType = (index: number) => {
    const updated = [...subjects];
    updated[index].inputType = updated[index].inputType === 'grade' ? 'percentage' : 'grade';
    setSubjects(updated);
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    for (const subject of subjects) {
      const credits = parseFloat(subject.creditHours);
      let points: number;
      
      if (subject.inputType === 'percentage' && subject.percentage) {
        points = percentageToGradePoints(parseFloat(subject.percentage));
      } else {
        points = gradePoints[subject.grade];
      }
      
      if (!isNaN(credits) && points !== undefined) {
        totalPoints += points * credits;
        totalCredits += credits;
      }
    }

    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    setCalculatedGPA(gpa);
    setStep('results');
  };

  const canCalculate = subjects.every((s) => {
    const hasGradeInput = (s.inputType === 'grade' && s.grade) || 
                         (s.inputType === 'percentage' && s.percentage && !isNaN(parseFloat(s.percentage)));
    const hasCredits = s.creditHours && !isNaN(parseFloat(s.creditHours));
    return hasGradeInput && hasCredits;
  });

  const resetCalculator = () => {
    setStep('input-count');
    setNumSubjects('');
    setSubjects([]);
    setCalculatedGPA(null);
    setShowInternational(false);
  };

  if (step === 'input-count') {
    return (
      <div className="min-h-screen p-4 py-8">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-500 p-3 rounded-lg">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl text-gray-900">Calculate Your GPA</h1>
                <p className="text-gray-600 text-sm">Step 1 of 3: Enter number of subjects</p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <div className="flex gap-2">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-900">
                    <strong>What is GPA?</strong> Grade Point Average (GPA) measures your academic performance 
                    in a single semester. It considers both your grades and the credit hours of each subject.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-700 mb-2 block">
                  How many subjects did you take this semester?
                </span>
                <input
                  type="number"
                  min="1"
                  max="15"
                  value={numSubjects}
                  onChange={(e) => setNumSubjects(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  placeholder="Enter a number (1-15)"
                />
              </label>

              {numSubjects && (parseInt(numSubjects) < 1 || parseInt(numSubjects) > 15) && (
                <p className="text-red-600 text-sm">Please enter a number between 1 and 15</p>
              )}

              <button
                onClick={handleNumSubjectsSubmit}
                disabled={!numSubjects || parseInt(numSubjects) < 1 || parseInt(numSubjects) > 15}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Continue to Enter Grades
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'input-subjects') {
    return (
      <div className="min-h-screen p-4 py-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setStep('input-count')}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 p-3 rounded-lg">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl text-gray-900">Enter Your Grades</h1>
                  <p className="text-gray-600 text-sm">Step 2 of 3: Enter grades or percentages with credit hours</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
              <div className="flex gap-2">
                <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-900">
                  <p className="mb-2">
                    <strong>Two ways to enter grades:</strong> You can enter either a letter grade (A, B+, etc.) OR a percentage. 
                    The system will automatically convert percentages to the correct grade based on our grading scale.
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowFormula(!showFormula)}
                      className="text-amber-700 underline hover:text-amber-800"
                    >
                      {showFormula ? 'Hide' : 'Show'} GPA Formula
                    </button>
                    <button
                      onClick={() => setShowGradingTable(!showGradingTable)}
                      className="text-amber-700 underline hover:text-amber-800"
                    >
                      {showGradingTable ? 'Hide' : 'Show'} Grading Scale
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {showGradingTable && (
              <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4 mb-6">
                <h3 className="text-gray-900 mb-3">Local Grading Scale (4.00 System):</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(gradePoints).map(([grade, points]) => (
                    <div key={grade} className="bg-white p-3 rounded border border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-900"><strong>{grade}</strong></span>
                        <span className="text-gray-600 text-sm">{points.toFixed(2)} points</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{getGradeRange(grade)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showFormula && (
              <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4 mb-6">
                <h3 className="text-gray-900 mb-3">GPA Calculation Formula:</h3>
                <div className="bg-white p-4 rounded border border-gray-200 font-mono text-sm mb-3">
                  GPA = (Sum of [Grade Points × Credit Hours]) / (Total Credit Hours)
                </div>
                <p className="text-sm text-gray-700">
                  <strong>Example:</strong> If you got an A (4.00) in a 3-credit course and a B (3.00) in a 2-credit course:<br />
                  GPA = [(4.00 × 3) + (3.00 × 2)] / (3 + 2) = 18.00 / 5 = 3.60
                </p>
              </div>
            )}

            <div className="space-y-4 mb-6">
              {subjects.map((subject, index) => (
                <div key={index} className="border-2 border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        Subject Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={subject.name}
                        onChange={(e) => updateSubject(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                        placeholder={`Subject ${index + 1}`}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-sm text-gray-700">
                          {subject.inputType === 'grade' ? 'Grade' : 'Percentage'} <span className="text-red-500">*</span>
                        </label>
                        <button
                          onClick={() => toggleInputType(index)}
                          className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                        >
                          <Percent className="w-3 h-3" />
                          Switch to {subject.inputType === 'grade' ? 'Percentage' : 'Grade'}
                        </button>
                      </div>
                      {subject.inputType === 'grade' ? (
                        <select
                          value={subject.grade}
                          onChange={(e) => updateSubject(index, 'grade', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                        >
                          <option value="">Select grade</option>
                          {Object.keys(gradePoints).map((grade) => (
                            <option key={grade} value={grade}>
                              {grade} ({gradePoints[grade].toFixed(2)} points)
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            step="0.1"
                            value={subject.percentage}
                            onChange={(e) => updateSubject(index, 'percentage', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                            placeholder="e.g., 85"
                          />
                          {subject.percentage && !isNaN(parseFloat(subject.percentage)) && isValidPercentage(parseFloat(subject.percentage)) && (
                            <p className="text-xs text-green-600 mt-1">
                              ✓ Converts to grade: {percentageToGrade(parseFloat(subject.percentage))} ({percentageToGradePoints(parseFloat(subject.percentage)).toFixed(2)} points)
                            </p>
                          )}
                          {subject.percentage && parseFloat(subject.percentage) > 100 && (
                            <p className="text-xs text-red-600 mt-1">Percentage cannot exceed 100</p>
                          )}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        Credit Hours <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={subject.creditHours}
                        onChange={(e) => updateSubject(index, 'creditHours', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                        placeholder="e.g., 3"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={calculateGPA}
                disabled={!canCalculate}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Calculate My GPA
              </button>
            </div>

            {!canCalculate && (
              <p className="text-amber-600 text-sm mt-4 text-center">
                Please fill in all grades/percentages and credit hours to continue
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Results view
  if (calculatedGPA !== null) {
    const totalCredits = subjects.reduce(
      (sum, s) => sum + (parseFloat(s.creditHours) || 0),
      0
    );
    const percentage = (calculatedGPA / 4.0) * 100;

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

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-500 p-3 rounded-lg">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl text-gray-900">Your GPA Results</h1>
                  <p className="text-gray-600 text-sm">Step 3 of 3: Understanding your results</p>
                </div>
              </div>
              <button
                onClick={resetCalculator}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Start Over
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
                <p className="text-indigo-100 text-sm mb-1">Your GPA</p>
                <p className="text-5xl mb-2">{calculatedGPA.toFixed(2)}</p>
                <p className="text-indigo-100 text-sm">out of 4.00</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white">
                <p className="text-blue-100 text-sm mb-1">Percentage</p>
                <p className="text-5xl mb-2">{percentage.toFixed(1)}%</p>
                <p className="text-blue-100 text-sm">Approximate</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
                <p className="text-green-100 text-sm mb-1">Total Credits</p>
                <p className="text-5xl mb-2">{totalCredits}</p>
                <p className="text-green-100 text-sm">This semester</p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="text-blue-900 mb-3">📊 Step-by-Step Breakdown</h3>
              <div className="space-y-2">
                {subjects.map((subject, index) => {
                  const credits = parseFloat(subject.creditHours);
                  let points: number;
                  let gradeDisplay: string;
                  
                  if (subject.inputType === 'percentage' && subject.percentage) {
                    const pct = parseFloat(subject.percentage);
                    points = percentageToGradePoints(pct);
                    gradeDisplay = `${pct}% → ${percentageToGrade(pct)}`;
                  } else {
                    points = gradePoints[subject.grade];
                    gradeDisplay = subject.grade;
                  }
                  
                  const weightedPoints = points * credits;
                  return (
                    <div key={index} className="bg-white rounded p-3 text-sm">
                      <div className="flex justify-between items-start">
                        <span className="text-gray-700">
                          <strong>{subject.name}</strong>: {gradeDisplay} ({points.toFixed(2)} points) × {credits} credits
                        </span>
                        <span className="text-indigo-600">
                          = {weightedPoints.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div className="border-t-2 border-blue-200 pt-2 mt-2">
                  <div className="bg-indigo-100 rounded p-3">
                    <p className="text-gray-800">
                      <strong>Final Calculation:</strong> Total Points ({subjects.reduce((sum, s) => {
                        const credits = parseFloat(s.creditHours);
                        const points = s.inputType === 'percentage' && s.percentage 
                          ? percentageToGradePoints(parseFloat(s.percentage))
                          : gradePoints[s.grade];
                        return sum + (points * credits);
                      }, 0).toFixed(2)}) ÷ Total Credits ({totalCredits}) = <strong className="text-indigo-600">{calculatedGPA.toFixed(2)}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {!showInternational && (
              <button
                onClick={() => setShowInternational(true)}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
              >
                <Globe className="w-5 h-5" />
                Convert to International GPA Systems
              </button>
            )}
          </div>

          {showInternational && (
            <InternationalGPAConverter
              gpa={calculatedGPA}
              onClose={() => setShowInternational(false)}
            />
          )}
        </div>
      </div>
    );
  }

  return null;
}