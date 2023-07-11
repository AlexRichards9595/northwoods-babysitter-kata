const babysitterCalculator = (startTime: string, endTime: string) => {
    if (startTime.split(":").length !== 2 || endTime.split(":").length !== 2) {
        return "Time must be entered as HH:MM.";
    }

    const startTimeHour = parseInt(startTime.split(":")[0]);
    const endTimeHour = parseInt(endTime.split(":")[0]);
    const startTimeMin = parseInt(startTime.split(":")[1]);
    const endTimeMin = parseInt(endTime.split(":")[1]);

    if(!(startTimeHour && startTimeMin && endTimeHour && endTimeMin)) {
        return "Time must be entered as HH:MM.";
    }

    if (startTimeHour < 17 ) {
        return "Start time must be 5:00pm or later.";
    }

    const endTimeIsEarlierThanStartTime = startTimeHour > endTimeHour || (startTimeHour === endTimeHour && endTimeMin <= startTimeMin);

    if (endTimeIsEarlierThanStartTime) {
        return "Start time must be earlier than end time.";
    }

    return "";
}

export default babysitterCalculator