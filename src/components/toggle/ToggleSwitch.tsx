import "./ToggleSwitch.css";

interface ToggleButtonProps {
  value: boolean;
  label: string;
  onChange: (value: boolean) => void;
}

export function ToggleSwitch({ value, label, onChange }: ToggleButtonProps) {
  return (
    <label className="switch">
      <input
        type="checkbox"
        role="switch"
        checked={value}
        onChange={(event) => onChange(event.target.checked)}
      />
      <div className="switch-inner">
        <div className="switch-base"></div>
        <div className="switch-toggle"></div>
      </div>
      <span className="switch-label">{label}</span>
    </label>
  );
}
