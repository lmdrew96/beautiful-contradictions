/**
 * RecipeCard Component
 *
 * Displays Romanian recipes in a bilingual format.
 * Features:
 * - Toggle between Romanian and English
 * - Ingredient and step lists
 * - Difficulty indicator
 * - Cooking time info
 */

import React, { useState } from 'react';
import {
  Clock,
  Users,
  ChefHat,
  MapPin,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { getDifficultyLabel, getDifficultyColor } from '../utils/difficulty';

function RecipeCard({ recipe, compact = false }) {
  const [showEnglish, setShowEnglish] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    ingredients: true,
    steps: !compact,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const difficultyColor = getDifficultyColor(recipe.difficulty);
  const difficultyLabel = getDifficultyLabel(recipe.difficulty);

  // Get text in current language
  const getText = (obj) => {
    if (typeof obj === 'string') return obj;
    return showEnglish ? obj.en : obj.ro;
  };

  return (
    <div className="bg-bg-secondary rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-border">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3 className="text-xl font-bold text-text-primary">
              {getText(recipe.title)}
            </h3>
            {!showEnglish && recipe.title.en && (
              <p className="text-text-muted text-sm italic mt-1">
                {recipe.title.en}
              </p>
            )}
          </div>

          {/* Difficulty badge */}
          <span
            className="px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap"
            style={{ backgroundColor: `${difficultyColor}20`, color: difficultyColor }}
          >
            {difficultyLabel}
          </span>
        </div>

        {/* Description */}
        <p className="text-text-secondary text-sm mb-4">
          {getText(recipe.description)}
        </p>

        {/* Meta info */}
        <div className="flex flex-wrap gap-4 text-sm text-text-muted">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {recipe.prepTime} + {recipe.cookTime}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            {recipe.servings} servings
          </span>
          <span className="flex items-center gap-1.5">
            <ChefHat className="w-4 h-4" />
            {recipe.category}
          </span>
          {recipe.region && recipe.region !== 'National' && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              {recipe.region}
            </span>
          )}
        </div>
      </div>

      {/* Language toggle */}
      <div className="px-5 py-3 bg-bg-tertiary border-b border-border">
        <button
          onClick={() => setShowEnglish(!showEnglish)}
          className="flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors"
        >
          {showEnglish ? (
            <>
              <EyeOff className="w-4 h-4" />
              Show Romanian
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              Show English
            </>
          )}
        </button>
      </div>

      {/* Ingredients */}
      <div className="border-b border-border">
        <button
          onClick={() => toggleSection('ingredients')}
          className="w-full px-5 py-3 flex items-center justify-between text-left hover:bg-bg-tertiary transition-colors"
        >
          <span className="font-medium text-text-primary">
            {showEnglish ? 'Ingredients' : 'Ingrediente'}
          </span>
          {expandedSections.ingredients ? (
            <ChevronUp className="w-5 h-5 text-text-muted" />
          ) : (
            <ChevronDown className="w-5 h-5 text-text-muted" />
          )}
        </button>

        {expandedSections.ingredients && (
          <ul className="px-5 pb-4 space-y-2">
            {recipe.ingredients.map((ing, index) => (
              <li key={index} className="flex items-start gap-2 text-text-secondary">
                <span className="text-warning mt-1">-</span>
                <span>
                  <span className="font-medium">{ing.amount}</span>
                  {' '}
                  {showEnglish ? ing.en : ing.ro}
                  {!showEnglish && ing.en && (
                    <span className="text-text-muted text-sm ml-2">({ing.en})</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Steps */}
      <div>
        <button
          onClick={() => toggleSection('steps')}
          className="w-full px-5 py-3 flex items-center justify-between text-left hover:bg-bg-tertiary transition-colors"
        >
          <span className="font-medium text-text-primary">
            {showEnglish ? 'Instructions' : 'Instructiuni'}
          </span>
          {expandedSections.steps ? (
            <ChevronUp className="w-5 h-5 text-text-muted" />
          ) : (
            <ChevronDown className="w-5 h-5 text-text-muted" />
          )}
        </button>

        {expandedSections.steps && (
          <ol className="px-5 pb-5 space-y-3">
            {recipe.steps.map((step, index) => (
              <li key={index} className="flex gap-3 text-text-secondary">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-warning/20 text-warning flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <div>
                  <p>{showEnglish ? step.en : step.ro}</p>
                  {!showEnglish && step.en && (
                    <p className="text-text-muted text-sm mt-1 italic">{step.en}</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* Footer attribution */}
      <div className="px-5 py-3 bg-bg-tertiary text-xs text-text-muted border-t border-border">
        {recipe.source} - {recipe.license}
      </div>
    </div>
  );
}

export default RecipeCard;
