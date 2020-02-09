export const getCs = prefix => {
    return cls => {
        if (typeof cls === "string") {
            return `${prefix}-${cls}`;
        } else {
            let className = "";
            let clsListLength = cls.length;
            for (let i=0; i<clsListLength; i++) {
                className += `${prefix}-${cls[i]} `;
            }
            return className.trim();
        } 
    }
}