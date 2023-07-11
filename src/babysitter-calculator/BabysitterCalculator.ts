const babysitterCalculator = (startTime: string, endTime: string): string => {
    if (!(correctTimeString(startTime) && correctTimeString(endTime))) {
        return "Time must be entered as HH:MM.";
    }

    const startTimeHour = parseInt(startTime.split(":")[0]);
    const endTimeHour = parseInt(endTime.split(":")[0]);
    const startTimeMin = parseInt(startTime.split(":")[1]);
    const endTimeMin = parseInt(endTime.split(":")[1]);

    if (startTimeHour < 17 ) {
        return "Start time must be 5:00pm or later.";
    }

    const endTimeIsEarlierThanStartTime = startTimeHour > endTimeHour || (startTimeHour === endTimeHour && endTimeMin <= startTimeMin);

    if (endTimeIsEarlierThanStartTime) {
        return "Start time must be earlier than end time.";
    }

    return "";
}

const correctTimeString = (time: string): boolean => {
    return !!(time.split(":").length === 2 && parseInt(time.split(":")[0]) && parseInt(time.split(":")[1]));
}

export default babysitterCalculator