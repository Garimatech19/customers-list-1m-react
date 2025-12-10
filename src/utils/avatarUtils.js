const getHslColor = (seed) => {
    // Simple hash function to get a consistent color from a string
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash); // hash * 31 + char
    }
    const h = hash % 360;
    // Keeping lightness and saturation within a good range for readability
    return `hsl(${h}, 60%, 70%)`;
};

// Function to generate an avatar as a Data URI with initials and a background color
export const generateInitialsAvatar = (name) => {
    const initials = name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2); // Get first two initials

    const color = getHslColor(name); // Generate a color based on the name

    // We'll generate an SVG as a Data URI
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
            <rect width="40" height="40" fill="${color}" rx="20" ry="20"/>
            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="16px" font-weight="bold">
                ${initials}
            </text>
        </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
};