import React, { useState } from 'react';
import { Globe, Info, X } from 'lucide-react';

interface InternationalGPAConverterProps {
  gpa?: number;
  cgpa?: number;
  onClose?: () => void;
}

interface CountrySystem {
  name: string;
  scale: string;
  convertedGPA: string;
  percentage: string;
  explanation: string;
}

export function InternationalGPAConverter({ gpa, cgpa, onClose }: InternationalGPAConverterProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  
  // Determine which value we're converting (GPA or CGPA)
  const value = cgpa !== undefined ? cgpa : (gpa !== undefined ? gpa : 0);
  const isCGPA = cgpa !== undefined;
  const label = isCGPA ? 'CGPA' : 'GPA';

  const countrySystems: { [key: string]: CountrySystem } = {
    usa: {
      name: 'United States (4.0 Scale)',
      scale: '4.0',
      convertedGPA: value.toFixed(2),
      percentage: ((value / 4.0) * 100).toFixed(1) + '%',
      explanation: `US institutions typically use a 4.0 scale. Your ${label} is already in this format.`,
    },
    uk: {
      name: 'United Kingdom (UK Honours)',
      scale: 'Class System',
      convertedGPA: value >= 3.7 ? 'First Class' : value >= 3.3 ? 'Upper Second (2:1)' : value >= 3.0 ? 'Lower Second (2:2)' : value >= 2.7 ? 'Third Class' : 'Pass',
      percentage: ((value / 4.0) * 100).toFixed(1) + '%',
      explanation: 'UK uses a class system. First Class typically requires 70%+, Upper Second 60-69%, Lower Second 50-59%.',
    },
    germany: {
      name: 'Germany (1-5 Scale, inverted)',
      scale: '1.0-5.0',
      convertedGPA: (5 - (value / 4.0) * 4).toFixed(2),
      percentage: ((value / 4.0) * 100).toFixed(1) + '%',
      explanation: 'German scale is inverted: 1.0 is the best, 5.0 is fail. Lower numbers indicate better performance.',
    },
    canada: {
      name: 'Canada (4.0 Scale)',
      scale: '4.0',
      convertedGPA: value.toFixed(2),
      percentage: ((value / 4.0) * 100).toFixed(1) + '%',
      explanation: 'Canadian universities typically use a 4.0 scale similar to the US system.',
    },
    australia: {
      name: 'Australia (7.0 Scale)',
      scale: '7.0',
      convertedGPA: ((value / 4.0) * 7).toFixed(2),
      percentage: ((value / 4.0) * 100).toFixed(1) + '%',
      explanation: 'Australian universities use a 7.0 scale. 7.0 is the highest, 4.0 is a pass.',
    },
    india: {
      name: 'India (10.0 Scale)',
      scale: '10.0',
      convertedGPA: ((value / 4.0) * 10).toFixed(2),
      percentage: ((value / 4.0) * 100).toFixed(1) + '%',
      explanation: 'Many Indian universities use a 10.0 scale. This is an approximate conversion.',
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-3 rounded-lg">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl text-gray-900">International {label} Interpretation</h2>
            <p className="text-gray-600 text-sm">See how your {label} translates across different systems</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        )}
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
        <div className="flex gap-2">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-900">
            <p className="mb-2">
              <strong>Important Disclaimer:</strong> These conversions are approximate and for informational purposes only. 
              Different universities may use different conversion methods.
            </p>
            <p>
              Always check with the specific institution you're applying to for their official {label} conversion policy.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">
          Select a country/region to see the interpretation:
        </label>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
        >
          <option value="">-- Choose a country/region --</option>
          <option value="usa">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="germany">Germany</option>
          <option value="canada">Canada</option>
          <option value="australia">Australia</option>
          <option value="india">India</option>
        </select>
      </div>

      {selectedCountry && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
              <p className="text-indigo-100 text-sm mb-1">Your Original {label}</p>
              <p className="text-4xl mb-2">{value.toFixed(2)}</p>
              <p className="text-indigo-100 text-sm">4.0 Scale (Local Standard)</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white">
              <p className="text-purple-100 text-sm mb-1">{countrySystems[selectedCountry].name}</p>
              <p className="text-4xl mb-2">{countrySystems[selectedCountry].convertedGPA}</p>
              <p className="text-purple-100 text-sm">{countrySystems[selectedCountry].scale} Scale</p>
            </div>
          </div>

          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
            <h3 className="text-purple-900 mb-2">📘 How This Works</h3>
            <p className="text-sm text-purple-900 mb-3">
              {countrySystems[selectedCountry].explanation}
            </p>
            <div className="bg-white rounded p-3 text-sm">
              <p className="text-gray-700">
                <strong>Percentage Equivalent:</strong> {countrySystems[selectedCountry].percentage}
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <div className="flex gap-2">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p>
                  <strong>Next Steps:</strong> If you're applying to universities in {countrySystems[selectedCountry].name.split('(')[0].trim()}, 
                  contact their admissions office to confirm their specific {label} conversion process. Some institutions may 
                  require an official credential evaluation service like WES or ECE.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}