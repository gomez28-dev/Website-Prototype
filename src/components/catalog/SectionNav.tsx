import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface SectionNavProps {
  title: string;
  onBack?: () => void;
  backLabel?: string;
}

export default function SectionNav({ title, onBack, backLabel = 'Back' }: SectionNavProps) {
  return (
    <div className="section-nav">
      <div className="section-nav-title">
        <h2>{title}</h2>
      </div>
      {onBack && (
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={14} /> {backLabel}
        </button>
      )}
    </div>
  );
}
