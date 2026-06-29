import React from 'react';
import type { Product } from '../../data/products';

interface ProductCardProps {
  product: Product;
  categoryName?: string;
  onViewDetails: () => void;
  variant?: 'category' | 'search';
  layoutClass?: string;
}

export default function ProductCard({
  product,
  categoryName,
  onViewDetails,
  variant = 'category',
  layoutClass = 'ix-card',
}: ProductCardProps) {
  if (variant === 'search') {
    return (
      <div className="ix-card">
        <div className="ix-card-image">
          <img src={product.image} alt={product.name} loading="lazy" />
        </div>
        <div className="ix-card-info">
          {categoryName && (
            <span className="product-category-tag search-card-tag">
              {categoryName}
            </span>
          )}
          <h4 className="ix-card-title search-card-title">{product.name}</h4>
          <div className="ix-card-actions search-card-actions">
            <button className="ix-view-btn" onClick={onViewDetails}>
              View Details
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={layoutClass}>
      <div className="ix-card-image">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="ix-card-info">
        <h4 className="ix-card-title category-card-title">{product.name}</h4>
        <div className="ix-card-actions category-card-actions">
          <button className="ix-view-btn" onClick={onViewDetails}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
