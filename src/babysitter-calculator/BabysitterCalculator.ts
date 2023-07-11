const babysitterCalculator = (startTime: string, endTime: string, bedTime: string): string => {
    if (!(correctTimeString(startTime) && correctTimeString(endTime) && correctTimeString(bedTime))) {
        return "Time must be entered as HH:MM.";
    }

    const endOrStartTimeError = findEndOrStartTimeErrors(startTime, endTime, bedTime);
    
    if(endOrStartTimeError){
        return endOrStartTimeError
    }

    const startTimeHour = getAdjustedTime(parseInt(startTime.split(":")[0]));
    const endTimeHour = getAdjustedTime(parseInt(endTime.split(":")[0]));
    const bedTimeHour = getAdjustedTime(parseInt(bedTime.split(":")[0]));

    const preBedtimeCost = (endTimeHour < bedTimeHour
    ? endTimeHour - startTimeHour
    : bedTimeHour - startTimeHour)*12;

    let preMidnightCost = 0;
    
    if(endTimeHour > bedTimeHour) {
        if (endTimeHour > 24) {
            preMidnightCost = (24 - bedTimeHour)*8
        } else {
            preMidnightCost = (endTimeHour - bedTimeHour)*8
        }
    }

    const postMidnightCost = endTimeHour > 24
    ? (endTimeHour - 24)*16
    : 0;

    const cost = preBedtimeCost + preMidnightCost + postMidnightCost;

    return `$${cost}.00`;
}

const correctTimeString = (time: string): boolean => {
    return time.split(":").length === 2 && Number.isInteger(parseInt(time.split(":")[0])) && Number.isInteger(parseInt(time.split(":")[1]));
}

const findEndOrStartTimeErrors = (startTime: string, endTime: string, bedTime: string): string | null => {
    const startTimeHour = parseInt(startTime.split(":")[0]);
    const endTimeHour = parseInt(endTime.split(":")[0]);
    const bedTimeHour = parseInt(bedTime.split(":")[0]);
    
    const startTimeMin = parseInt(startTime.split(":")[1]);
    const endTimeMin = parseInt(endTime.split(":")[1]);
    const bedTimeMin = parseInt(bedTime.split(":")[1]);
    
    if (startTimeHour < 17 && startTimeHour > 4) {
        return "Start time must be 5:00pm or later.";
    }


    if (endTimeHour < 17 && endTimeHour >= 4 && endTime !== "04:00" ) {
        return "End time must be no later than 4:00am";
    }

    const adjustedStartTimeHour = getAdjustedTime(startTimeHour);
    const adjustedEndTimeHour = getAdjustedTime(endTimeHour);

    const endTimeIsEarlierThanStartTime = 
    (adjustedStartTimeHour > adjustedEndTimeHour)
    || (adjustedStartTimeHour === adjustedEndTimeHour && endTimeMin <= startTimeMin) 

    if (endTimeIsEarlierThanStartTime) {
        return "Start time must be earlier than end time.";
    }

    const adjustedBedTimeHour = getAdjustedTime(bedTimeHour);

    const bedTimeIsEarlierThanStartTime = adjustedStartTimeHour > adjustedBedTimeHour || (adjustedStartTimeHour === adjustedBedTimeHour && bedTimeMin <= startTimeMin);
    if (bedTimeIsEarlierThanStartTime) {
        return "Start time must be earlier than bed time.";
    }
    return null;
}

const getAdjustedTime = (time: number) => {
    return time < 17 ? time + 24 : time;
}

export default babysitterCalculator;