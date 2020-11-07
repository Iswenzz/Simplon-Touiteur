/**
 * Get a random image URL.
 * @returns {string}
 */
export const randomImage = () => `https://lorempixel.com/640/480/?${Math.floor(Math.random() * Math.floor(40000))}`;