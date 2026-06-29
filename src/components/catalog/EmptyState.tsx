import React from 'react';

interface EmptyStateProps {
  title?: string;
  text?: string;
}

export default function EmptyState({
  title = 'No products found',
  text = 'Try adjusting your search criteria',
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <h3 className="empty-title">{title}</h3>
      <p className="empty-text">{text}</p>
    </div>
  );
}
