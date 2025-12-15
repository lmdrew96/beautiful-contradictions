/**
 * Unit conversion utilities for recipes
 * Converts between metric and imperial measurements
 */

// Conversion factors and target units
const CONVERSIONS = {
  // Weight
  'g': { imperial: 'oz', factor: 0.035274, round: 0.25 },
  'kg': { imperial: 'lb', factor: 2.20462, round: 0.25 },

  // Volume
  'ml': { imperial: 'fl oz', factor: 0.033814, round: 0.5 },
  'l': { imperial: 'cups', factor: 4.22675, round: 0.25 },
  'litru': { imperial: 'cups', factor: 4.22675, round: 0.25 },

  // Romanian spoon measurements (keep as-is, just translate)
  'lingura': { imperial: 'tbsp', factor: 1, round: 1 },
  'linguri': { imperial: 'tbsp', factor: 1, round: 1 },
  'lingurita': { imperial: 'tsp', factor: 1, round: 1 },
  'lingurite': { imperial: 'tsp', factor: 1, round: 1 },

  // Count-based (no conversion needed)
  'bucata': { imperial: '', factor: 1, round: 1 },
  'bucati': { imperial: '', factor: 1, round: 1 },
  'legatura': { imperial: 'bunch', factor: 1, round: 1 },
  'legaturi': { imperial: 'bunches', factor: 1, round: 1 },
  'capatana': { imperial: 'head', factor: 1, round: 1 },
  'catei': { imperial: 'cloves', factor: 1, round: 1 },

  // Special
  'ore': { imperial: 'hours', factor: 1, round: 1 },
  'ora': { imperial: 'hour', factor: 1, round: 1 },
  'minute': { imperial: 'minutes', factor: 1, round: 1 },
};

/**
 * Round to nearest fraction for cooking-friendly amounts
 */
function roundToFraction(value, fraction) {
  return Math.round(value / fraction) * fraction;
}

/**
 * Format a number nicely (remove trailing zeros, use fractions where appropriate)
 */
function formatAmount(value) {
  // Common fractions for cooking
  const fractions = {
    0.25: '1/4',
    0.5: '1/2',
    0.75: '3/4',
    0.33: '1/3',
    0.67: '2/3',
  };

  const whole = Math.floor(value);
  const decimal = value - whole;

  // Check if decimal is close to a common fraction
  for (const [dec, frac] of Object.entries(fractions)) {
    if (Math.abs(decimal - parseFloat(dec)) < 0.05) {
      return whole > 0 ? `${whole} ${frac}` : frac;
    }
  }

  // Otherwise, just format the number
  if (decimal === 0) return whole.toString();
  return value.toFixed(1).replace(/\.0$/, '');
}

/**
 * Parse an amount string like "500 g" or "2 bucati"
 * Returns { value: number, unit: string, extra: string }
 */
function parseAmount(amountStr) {
  if (!amountStr) return { value: 0, unit: '', extra: '' };

  // Handle special cases like "dupa gust" (to taste)
  if (amountStr.includes('dupa gust') || amountStr.includes('optional')) {
    return { value: 0, unit: '', extra: amountStr };
  }

  // Match patterns like "500 g", "1/2 lingurita", "2-3 bucati"
  const match = amountStr.match(/^([\d.,/\-]+)\s*(.+)$/);

  if (!match) {
    return { value: 0, unit: '', extra: amountStr };
  }

  let valueStr = match[1];
  const unitPart = match[2].trim();

  // Handle fractions like "1/2"
  if (valueStr.includes('/')) {
    const [num, denom] = valueStr.split('/').map(Number);
    valueStr = (num / denom).toString();
  }

  // Handle ranges like "2-3" - take the average
  if (valueStr.includes('-')) {
    const [min, max] = valueStr.split('-').map(Number);
    valueStr = ((min + max) / 2).toString();
  }

  return {
    value: parseFloat(valueStr.replace(',', '.')) || 0,
    unit: unitPart.split(' ')[0].toLowerCase(),
    extra: unitPart.split(' ').slice(1).join(' '),
  };
}

/**
 * Convert an amount to imperial
 * @param {string} amountStr - Original amount like "500 g"
 * @returns {string} - Converted amount like "17.5 oz"
 */
export function convertToImperial(amountStr) {
  const { value, unit, extra } = parseAmount(amountStr);

  if (value === 0) return amountStr; // Return as-is for special cases

  const conversion = CONVERSIONS[unit];

  if (!conversion) {
    // Unknown unit, return original
    return amountStr;
  }

  if (conversion.factor === 1 && conversion.imperial) {
    // Just translate the unit name
    return `${value} ${conversion.imperial}${extra ? ' ' + extra : ''}`;
  }

  if (conversion.factor === 1) {
    // Keep as-is (like "bucati")
    return amountStr;
  }

  // Convert the value
  const converted = value * conversion.factor;
  const rounded = roundToFraction(converted, conversion.round);
  const formatted = formatAmount(rounded);

  return `${formatted} ${conversion.imperial}${extra ? ' ' + extra : ''}`;
}

/**
 * Get the display amount based on unit preference
 */
export function getDisplayAmount(amount, useImperial = false) {
  if (!useImperial) return amount;
  return convertToImperial(amount);
}

export default { convertToImperial, getDisplayAmount };
