export const parseImageUrls = (rawValue) => {
  if (!rawValue) return [];

  if (Array.isArray(rawValue)) {
    return rawValue.filter(Boolean);
  }

  const value = String(rawValue).trim();
  if (!value) return [];

  if (value.startsWith('[') && value.endsWith(']')) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.filter(Boolean);
      }
    } catch (error) {
      return [value];
    }
  }

  if (value.includes(',')) {
    const splitValues = value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    if (splitValues.length > 1) {
      return splitValues;
    }
  }

  return [value];
};

export const getFeaturedImage = (rawValue) => parseImageUrls(rawValue)[0] || '';
