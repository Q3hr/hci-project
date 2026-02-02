import React from 'react';
import { gradePoints, getGradeRange } from '../utils/gradeSystem';

interface GradingTableProps {
  compact?: boolean;
}

export function GradingTable({ compact = false }: GradingTableProps) {
  if (compact) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {Object.entries(gradePoints).map(([grade, points]) => (
          <div key={grade} className="bg-white p-2 rounded border border-gray-200 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-900"><strong>{grade}</strong></span>
              <span className="text-gray-600">{points.toFixed(2)}</span>
            </div>
            <div className="text-xs text-gray-500 mt-0.5">{getGradeRange(grade)}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-indigo-600 text-white">
            <th className="p-3 text-left">Letter Grade</th>
            <th className="p-3 text-left">Grade Points</th>
            <th className="p-3 text-left">Percentage Range</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(gradePoints).map(([grade, points], index) => (
            <tr
              key={grade}
              className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
            >
              <td className="p-3 border-t border-gray-200">
                <strong className="text-gray-900">{grade}</strong>
              </td>
              <td className="p-3 border-t border-gray-200 text-gray-700">
                {points.toFixed(2)}
              </td>
              <td className="p-3 border-t border-gray-200 text-gray-600">
                {getGradeRange(grade)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
