// Gaya CSS untuk bagian hero
export const globalCss = `
    @keyframes gradient-shift {
        0% { background-position: 0% 50% }
        50% { background-position: 100% 50% }
        100% { background-position: 0% 50% }
    }
`;

// Menerapkan CSS global ke dokumen
export const applyGlobalStyles = (): void => {
    if (typeof document !== 'undefined') {
        const style = document.createElement('style');
        style.innerHTML = globalCss;
        document.head.appendChild(style);
    }
};
