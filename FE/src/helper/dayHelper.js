export function differenceInDays(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const differenceInMilisecond = end - start;
    
    const differnceInDays = differenceInMilisecond / (1000 * 60 * 60 * 24);
    
    return Math.floor(differnceInDays); 
}