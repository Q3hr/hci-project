// Local Grading System (4.00 Scale)
/**
 * This grading system is based on the provided guidelines and must be
 * consistently applied across all GPA and CGPA calculations.
 * 
 * Scale: 4.00 (A) to 0.00 (F)
 * 
 * Grading Criteria:
 * - A:  > 85%         = 4.00 points
 * - A-: > 79 and ≤ 85% = 3.67 points
 * - B+: > 73 and ≤ 79% = 3.33 points
 * - B:  > 67 and ≤ 73% = 3.00 points
 * - B-: > 61 and ≤ 67% = 2.67 points
 * - C+: > 55 and ≤ 61% = 2.33 points
 * - C:  > 49 and ≤ 55% = 2.00 points
 * - D:  40 - 49%       = 1.00 points
 * - F:  < 40%          = 0.00 points
 */

export interface GradeMapping {
  grade: string;
  minPercentage: number;
  maxPercentage: number;
  points: number;
}

export const gradeSystem: GradeMapping[] = [
  { grade: 'A', minPercentage: 85.01, maxPercentage: 100, points: 4.0 },
  { grade: 'A-', minPercentage: 79.01, maxPercentage: 85, points: 3.67 },
  { grade: 'B+', minPercentage: 73.01, maxPercentage: 79, points: 3.33 },
  { grade: 'B', minPercentage: 67.01, maxPercentage: 73, points: 3.0 },
  { grade: 'B-', minPercentage: 61.01, maxPercentage: 67, points: 2.67 },
  { grade: 'C+', minPercentage: 55.01, maxPercentage: 61, points: 2.33 },
  { grade: 'C', minPercentage: 49.01, maxPercentage: 55, points: 2.0 },
  { grade: 'D', minPercentage: 40, maxPercentage: 49, points: 1.0 },
  { grade: 'F', minPercentage: 0, maxPercentage: 39.99, points: 0.0 },
];

export const gradePoints: { [key: string]: number } = {
  'A': 4.0,
  'A-': 3.67,
  'B+': 3.33,
  'B': 3.0,
  'B-': 2.67,
  'C+': 2.33,
  'C': 2.0,
  'D': 1.0,
  'F': 0.0,
};

/**
 * Convert a percentage to a grade based on the local grading system
 */
export function percentageToGrade(percentage: number): string {
  for (const mapping of gradeSystem) {
    if (percentage > mapping.minPercentage && percentage <= mapping.maxPercentage) {
      return mapping.grade;
    }
    // Handle exact boundary for minimum (40% for D)
    if (percentage === mapping.minPercentage && mapping.minPercentage === 40) {
      return mapping.grade;
    }
  }
  // Default to F if below 40
  return 'F';
}

/**
 * Get grade points from a percentage
 */
export function percentageToGradePoints(percentage: number): number {
  const grade = percentageToGrade(percentage);
  return gradePoints[grade];
}

/**
 * Get the percentage range for a given grade
 */
export function getGradeRange(grade: string): string {
  const mapping = gradeSystem.find(m => m.grade === grade);
  if (!mapping) return 'Unknown';
  
  if (mapping.grade === 'A') return '> 85';
  if (mapping.grade === 'D') return '40 - 49';
  if (mapping.grade === 'F') return '< 40';
  
  return `> ${mapping.minPercentage.toFixed(0)} and ≤ ${mapping.maxPercentage.toFixed(0)}`;
}

/**
 * Validate if a percentage is valid (0-100)
 */
export function isValidPercentage(percentage: number): boolean {
  return percentage >= 0 && percentage <= 100;
}

/**
 * Get all available grades
 */
export function getAvailableGrades(): string[] {
  return Object.keys(gradePoints);
}