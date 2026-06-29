import React from 'react';
import type { Product } from '../../data/products';

interface RelatedCardProps {
  product: Product;
  onClick: () => void;
}

export default function RelatedCard({ product, onClick }: RelatedCardProps) {
  return (
    <div className="related-card" onClick={onClick}>
      <div className="related-image">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="related-info">
        <h4 className="related-name">{product.name}</h4>
      </div>
    </div>
  );
}
