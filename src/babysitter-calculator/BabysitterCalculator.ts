const babysitterCalculator = (startTime: string) => {
    if(parseInt(startTime.split(":")[0]) >= 17 ) {
        return "";
    }
    return "Start time must be 5:00pm or later.";
}

export default babysitterCalculator