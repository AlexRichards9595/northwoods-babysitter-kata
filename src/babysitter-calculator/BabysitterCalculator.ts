const babysitterCalculator = (startTime: string, endTime: string): string => {
    if (!(correctTimeString(startTime) && correctTimeString(endTime))) {
        return "Time must be entered as HH:MM.";
    }

    const endOrStartTimeError = findEndOrStartTimeErrors(startTime, endTime)
    if(endOrStartTimeError){
        return endOrStartTimeError
    }

    return "";
}

const correctTimeString = (time: string): boolean => {
    return time.split(":").length === 2 && Number.isInteger(parseInt(time.split(":")[0])) && Number.isInteger(parseInt(time.split(":")[1]));
}

const findEndOrStartTimeErrors = (startTime: string, endTime: string): string | null => {
    const startTimeHour = parseInt(startTime.split(":")[0]);
    const endTimeHour = parseInt(endTime.split(":")[0]);
    const startTimeMin = parseInt(startTime.split(":")[1]);
    const endTimeMin = parseInt(endTime.split(":")[1]);
    
    if (startTimeHour < 17 ) {
        return "Start time must be 5:00pm or later.";
    }

    const endTimeIsEarlierThanStartTime = startTimeHour > endTimeHour || (startTimeHour === endTimeHour && endTimeMin <= startTimeMin);

    if (endTimeIsEarlierThanStartTime) {
        if (endTimeHour < 17 && endTime !== "04:00" && endTimeHour > 3) {
            return "End time must be no later than 4:00am"
        }
        return "Start time must be earlier than end time.";
    }

    return null;
}

export default babysitterCalculator