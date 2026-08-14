"use client";

import { useState } from "react";

const PRESETS = [
  { label: "15m", minutes: 15 },
  { label: "30m", minutes: 30 },
  { label: "45m", minutes: 45 },
  { label: "1h", minutes: 60 },
  { label: "2h", minutes: 120 },
];

type Unit = "minutes" | "hours" | "days";

export default function PrepTimeInput({
  onChange,
}: {
  onChange?: (totalMinutes: number | null) => void;
}) {
  const [selectedMinutes, setSelectedMinutes] = useState<number | null>(15);
  const [isCustom, setIsCustom] = useState<boolean>(false);

  // Custom mode state - initialized as string to allow empty string ""
  const [customValue, setCustomValue] = useState<string>("3");
  const [customUnit, setCustomUnit] = useState<Unit>("days");

  const calculateCustomMinutes = (valueStr: string, unit: Unit) => {
    const num = parseInt(valueStr, 10);
    if (isNaN(num) || num <= 0) return null;

    const multipliers: Record<Unit, number> = {
      minutes: 1,
      hours: 60,
      days: 1440,
    };
    return num * multipliers[unit];
  };

  const handlePresetSelect = (minutes: number) => {
    setIsCustom(false);
    setSelectedMinutes(minutes);
    onChange?.(minutes);
  };

  // Allows user to backspace completely without forcing 1
  const handleCustomValueChange = (valStr: string) => {
    setCustomValue(valStr); // Can be "" when backspacing
    const total = calculateCustomMinutes(valStr, customUnit);
    setSelectedMinutes(total);
    onChange?.(total);
  };

  const handleCustomUnitChange = (unit: Unit) => {
    setCustomUnit(unit);
    const total = calculateCustomMinutes(customValue, unit);
    setSelectedMinutes(total);
    onChange?.(total);
  };

  const handleCustomClick = () => {
    setIsCustom(true);
    const total = calculateCustomMinutes(customValue, customUnit);
    setSelectedMinutes(total);
    onChange?.(total);
  };

  return (
    <div className="w-full max-w-md space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Preparation Time
      </label>

      {/* Preset Chips + Custom Toggle */}
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => {
          const isActive = !isCustom && selectedMinutes === preset.minutes;
          return (
            <button
              key={preset.minutes}
              type="button"
              onClick={() => handlePresetSelect(preset.minutes)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {preset.label}
            </button>
          );
        })}

        <button
          type="button"
          onClick={handleCustomClick}
          className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
            isCustom
              ? "bg-indigo-600 text-white shadow-sm"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Custom...
        </button>
      </div>

      {/* Custom Input with native required validation and clean backspace */}
      {isCustom && (
        <div className="flex items-center gap-2 pt-1">
          <input
            type="number"
            required
            min="1"
            placeholder="e.g. 30"
            value={customValue}
            onChange={(e) => handleCustomValueChange(e.target.value)}
            className="w-28 rounded-md border border-gray-300 px-3 py-1.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />

          <select
            value={customUnit}
            onChange={(e) => handleCustomUnitChange(e.target.value as Unit)}
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
            <option value="days">Days</option>
          </select>
        </div>
      )}

      {/* DB Value Debug Output */}
      <div className="text-xs text-gray-500">
        Saved to DB as:{" "}
        <span className="font-mono font-semibold text-gray-700">
          {selectedMinutes !== null
            ? `${selectedMinutes} minutes`
            : "Invalid / Empty"}
        </span>
      </div>
    </div>
  );
}
