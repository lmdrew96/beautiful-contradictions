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
    <div className="bg-slate-800/50 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-slate-700">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3 className="text-xl font-bold text-white">
              {getText(recipe.title)}
            </h3>
            {!showEnglish && recipe.title.en && (
              <p className="text-slate-400 text-sm italic mt-1">
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
        <p className="text-slate-300 text-sm mb-4">
          {getText(recipe.description)}
        </p>

        {/* Meta info */}
        <div className="flex flex-wrap gap-4 text-sm text-slate-400">
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
      <div className="px-5 py-3 bg-slate-900/30 border-b border-slate-700">
        <button
          onClick={() => setShowEnglish(!showEnglish)}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
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
      <div className="border-b border-slate-700">
        <button
          onClick={() => toggleSection('ingredients')}
          className="w-full px-5 py-3 flex items-center justify-between text-left hover:bg-slate-700/30 transition-colors"
        >
          <span className="font-medium text-white">
            {showEnglish ? 'Ingredients' : 'Ingrediente'}
          </span>
          {expandedSections.ingredients ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {expandedSections.ingredients && (
          <ul className="px-5 pb-4 space-y-2">
            {recipe.ingredients.map((ing, index) => (
              <li key={index} className="flex items-start gap-2 text-slate-300">
                <span className="text-amber-500 mt-1">-</span>
                <span>
                  <span className="font-medium">{ing.amount}</span>
                  {' '}
                  {showEnglish ? ing.en : ing.ro}
                  {!showEnglish && ing.en && (
                    <span className="text-slate-500 text-sm ml-2">({ing.en})</span>
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
          className="w-full px-5 py-3 flex items-center justify-between text-left hover:bg-slate-700/30 transition-colors"
        >
          <span className="font-medium text-white">
            {showEnglish ? 'Instructions' : 'Instructiuni'}
          </span>
          {expandedSections.steps ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {expandedSections.steps && (
          <ol className="px-5 pb-5 space-y-3">
            {recipe.steps.map((step, index) => (
              <li key={index} className="flex gap-3 text-slate-300">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <div>
                  <p>{showEnglish ? step.en : step.ro}</p>
                  {!showEnglish && step.en && (
                    <p className="text-slate-500 text-sm mt-1 italic">{step.en}</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* Footer attribution */}
      <div className="px-5 py-3 bg-slate-900/30 text-xs text-slate-500 border-t border-slate-700">
        {recipe.source} - {recipe.license}
      </div>
    </div>
  );
}

export default RecipeCard;
