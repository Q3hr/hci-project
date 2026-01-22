import React, { useState } from 'react';
import { ArrowLeft, Calculator, Info, RotateCcw, TrendingUp } from 'lucide-react';
import { gradePoints } from '../utils/gradeSystem';

interface CGPACalculatorProps {
  onBack: () => void;
}

interface Semester {
  name: string;
  gpa: string;
  creditHours: string;
}

export function CGPACalculator({ onBack }: CGPACalculatorProps) {
  const [step, setStep] = useState<'input-count' | 'input-semesters' | 'results'>('input-count');
  const [numSemesters, setNumSemesters] = useState('');
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [calculatedCGPA, setCalculatedCGPA] = useState<number | null>(null);

  const handleNumSemestersSubmit = () => {
    const num = parseInt(numSemesters);
    if (num > 0 && num <= 12) {
      const newSemesters = Array.from({ length: num }, (_, i) => ({
        name: `Semester ${i + 1}`,
        gpa: '',
        creditHours: '',
      }));
      setSemesters(newSemesters);
      setStep('input-semesters');
    }
  };

  const updateSemester = (index: number, field: keyof Semester, value: string) => {
    const updated = [...semesters];
    updated[index][field] = value;
    setSemesters(updated);
  };

  const calculateCGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    for (const semester of semesters) {
      const credits = parseFloat(semester.creditHours);
      const gpa = parseFloat(semester.gpa);
      if (!isNaN(credits) && !isNaN(gpa)) {
        totalPoints += gpa * credits;
        totalCredits += credits;
      }
    }

    const cgpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    setCalculatedCGPA(cgpa);
    setStep('results');
  };

  const canCalculate = semesters.every(
    (s) => s.gpa && s.creditHours && !isNaN(parseFloat(s.gpa)) && !isNaN(parseFloat(s.creditHours)) && parseFloat(s.gpa) <= 4.0
  );

  const resetCalculator = () => {
    setStep('input-count');
    setNumSemesters('');
    setSemesters([]);
    setCalculatedCGPA(null);
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
              <div className="bg-purple-500 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl text-gray-900">Calculate Your CGPA</h1>
                <p className="text-gray-600 text-sm">Step 1 of 3: Enter number of semesters</p>
              </div>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
              <div className="flex gap-2">
                <Info className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-purple-900 mb-2">
                    <strong>What is CGPA?</strong> Cumulative Grade Point Average (CGPA) is your overall academic 
                    performance across <strong>all semesters</strong> of your degree program.
                  </p>
                  <p className="text-sm text-purple-900">
                    <strong>Difference from GPA:</strong> GPA measures performance in a single semester, 
                    while CGPA is the weighted average of all your semester GPAs.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-700 mb-2 block">
                  How many semesters have you completed?
                </span>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={numSemesters}
                  onChange={(e) => setNumSemesters(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  placeholder="Enter a number (1-12)"
                />
              </label>

              {numSemesters && (parseInt(numSemesters) < 1 || parseInt(numSemesters) > 12) && (
                <p className="text-red-600 text-sm">Please enter a number between 1 and 12</p>
              )}

              <button
                onClick={handleNumSemestersSubmit}
                disabled={!numSemesters || parseInt(numSemesters) < 1 || parseInt(numSemesters) > 12}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Continue to Enter Semester Data
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'input-semesters') {
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
                <div className="bg-purple-500 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl text-gray-900">Enter Semester Data</h1>
                  <p className="text-gray-600 text-sm">Step 2 of 3: Enter GPA and credit hours for each semester</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
              <div className="flex gap-2">
                <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-900">
                  <p className="mb-2">
                    Enter the <strong>GPA</strong> you earned in each semester and the <strong>total credit hours</strong> 
                    you completed that semester. You can find this information on your transcript or semester grade report.
                  </p>
                  <div className="bg-white p-3 rounded border border-amber-200 mt-2">
                    <p className="text-xs text-gray-700 mb-1"><strong>CGPA Formula:</strong></p>
                    <p className="font-mono text-xs">CGPA = (Sum of [Semester GPA × Semester Credits]) / (Total Credits)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {semesters.map((semester, index) => (
                <div key={index} className="border-2 border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        Semester Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={semester.name}
                        onChange={(e) => updateSemester(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                        placeholder={`Semester ${index + 1}`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        Semester GPA <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="4"
                        step="0.01"
                        value={semester.gpa}
                        onChange={(e) => updateSemester(index, 'gpa', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                        placeholder="e.g., 3.5"
                      />
                      {semester.gpa && parseFloat(semester.gpa) > 4.0 && (
                        <p className="text-red-500 text-xs mt-1">GPA cannot exceed 4.0</p>
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
                        value={semester.creditHours}
                        onChange={(e) => updateSemester(index, 'creditHours', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                        placeholder="e.g., 15"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={calculateCGPA}
                disabled={!canCalculate}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Calculate My CGPA
              </button>
            </div>

            {!canCalculate && (
              <p className="text-amber-600 text-sm mt-4 text-center">
                Please fill in all GPA values (0-4.0) and credit hours to continue
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Results view
  if (calculatedCGPA !== null) {
    const totalCredits = semesters.reduce(
      (sum, s) => sum + (parseFloat(s.creditHours) || 0),
      0
    );
    const percentage = (calculatedCGPA / 4.0) * 100;

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
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-500 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl text-gray-900">Your CGPA Results</h1>
                  <p className="text-gray-600 text-sm">Step 3 of 3: Understanding your cumulative performance</p>
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
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white">
                <p className="text-purple-100 text-sm mb-1">Your CGPA</p>
                <p className="text-5xl mb-2">{calculatedCGPA.toFixed(2)}</p>
                <p className="text-purple-100 text-sm">out of 4.00</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white">
                <p className="text-blue-100 text-sm mb-1">Percentage</p>
                <p className="text-5xl mb-2">{percentage.toFixed(1)}%</p>
                <p className="text-blue-100 text-sm">Approximate</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
                <p className="text-green-100 text-sm mb-1">Total Credits</p>
                <p className="text-5xl mb-2">{totalCredits}</p>
                <p className="text-green-100 text-sm">All semesters</p>
              </div>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
              <h3 className="text-purple-900 mb-3">📊 Semester-by-Semester Breakdown</h3>
              <div className="space-y-2">
                {semesters.map((semester, index) => {
                  const credits = parseFloat(semester.creditHours);
                  const gpa = parseFloat(semester.gpa);
                  const weightedPoints = gpa * credits;
                  return (
                    <div key={index} className="bg-white rounded p-3 text-sm">
                      <div className="flex justify-between items-start">
                        <span className="text-gray-700">
                          <strong>{semester.name}</strong>: GPA {gpa.toFixed(2)} × {credits} credits
                        </span>
                        <span className="text-purple-600">
                          = {weightedPoints.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div className="border-t-2 border-purple-200 pt-2 mt-2">
                  <div className="bg-purple-100 rounded p-3">
                    <p className="text-gray-800">
                      <strong>Final Calculation:</strong> Total Points ({semesters.reduce((sum, s) => sum + (parseFloat(s.gpa) * parseFloat(s.creditHours)), 0).toFixed(2)}) ÷ Total Credits ({totalCredits}) = <strong className="text-purple-600">{calculatedCGPA.toFixed(2)}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <div className="flex gap-2">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="mb-2">
                    <strong>What does this mean?</strong> Your CGPA of {calculatedCGPA.toFixed(2)} represents your 
                    overall academic performance across all {semesters.length} semesters. This is the number most 
                    commonly used for scholarships, graduate school applications, and job applications.
                  </p>
                  <p>
                    <strong>Note:</strong> Different institutions may have slightly different grading scales. 
                    Always verify with your institution's official grading policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}