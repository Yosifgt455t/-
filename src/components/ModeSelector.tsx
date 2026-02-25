/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FC } from 'react';

export type StudyMode = 'q&a' | 'explain' | 'quiz' | 'teach-me';

interface ModeSelectorProps {
  currentMode: StudyMode;
  onModeChange: (mode: StudyMode) => void;
}

const MODES: { id: StudyMode; label: string }[] = [
  { id: 'q&a', label: 'سؤال وجواب' },
  { id: 'explain', label: 'اشرحلي (سالفة)' },
  { id: 'quiz', label: 'امتحني' },
  { id: 'teach-me', label: 'أني أشرحلك' },
];

const ModeSelector: FC<ModeSelectorProps> = ({ currentMode, onModeChange }) => {
  return (
    <div className="flex justify-center space-x-2 rounded-full bg-slate-700 p-2" dir="rtl">
      {MODES.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onModeChange(mode.id)}
          className={`rounded-full px-6 py-2 text-sm font-semibold transition-colors ${
            currentMode === mode.id
              ? 'bg-cyan-600 text-white shadow-md'
              : 'text-gray-300 hover:bg-slate-600'
          }`}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
};

export default ModeSelector;
