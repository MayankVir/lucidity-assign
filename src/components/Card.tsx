import React from "react";

interface CardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  className?: string;
}

const Card: React.FC<CardProps> = ({ icon, title, value, className = "" }) => {
  return (
    <div className={`bg-custom-forest rounded-lg p-6 ${className}`}>
      <div className="flex items-start gap-4">
        <div className="text-white">{icon}</div>
        <div className="flex flex-col">
          <span className="text-white text-sm mb-2">{title}</span>
          <span className="text-white text-3xl font-semibold">{value}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
