import React, { FC } from 'react';

interface DockButton {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

interface DockProps {
  buttons: DockButton[];
  className?: string;
}

const Dock: FC<DockProps> = ({ buttons, className = '' }) => {
  return (
    <div className={`dock bg-neutral text-neutral-content ${className}`}>
      {buttons.map((button, index) => (
        <button
          key={index}
          className={`dock-btn ${button.active ? 'dock-active' : ''}`}
          onClick={button.onClick}
        >
          <span className="dock-icon">{button.icon}</span>
          <span className="dock-label">{button.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Dock;
