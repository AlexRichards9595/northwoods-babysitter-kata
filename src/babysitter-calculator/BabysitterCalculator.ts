const babysitterCalculator = (startTime: string, endTime: string, bedTime: string): string => {
    if (!(correctTimeString(startTime) && correctTimeString(endTime) && correctTimeString(bedTime))) {
        return "Time must be entered as HH:MM.";
    }

    const adjustedStartTime = getAdjustedTime(startTime);
    const adjustedEndTime = getAdjustedTime(endTime);
    const adjustedBedTime = getAdjustedTime(bedTime);

    const endOrStartTimeError = findEndOrStartTimeErrors(adjustedStartTime, adjustedEndTime);
    
    if(endOrStartTimeError){
        return endOrStartTimeError
    }

    let preBedtimeCost = 0;
    
    if(adjustedBedTime > adjustedStartTime) {
        if(adjustedEndTime < adjustedBedTime) {
            preBedtimeCost = (adjustedEndTime - adjustedStartTime)*12
        } else {
            preBedtimeCost = (adjustedBedTime - adjustedStartTime)*12
        }
    }

    let preMidnightCost = 0;
    
    if(adjustedEndTime > adjustedBedTime) {
        if (adjustedEndTime > 24) {
            preMidnightCost = (24 - adjustedBedTime)*8
        } else {
            if(adjustedBedTime > adjustedStartTime) {
                preMidnightCost = (adjustedEndTime - adjustedBedTime)*8
            } else {
                preMidnightCost = (adjustedEndTime - adjustedStartTime)*8
            }
        }
    }

    const postMidnightCost = adjustedEndTime > 24
    ? (adjustedEndTime - 24)*16
    : 0;

    const cost = preBedtimeCost + preMidnightCost + postMidnightCost;

    return `$${cost}.00`;
}

const correctTimeString = (time: string): boolean => {
    return time.split(":").length === 2 && Number.isInteger(parseInt(time.split(":")[0])) && Number.isInteger(parseInt(time.split(":")[1]));
}

const findEndOrStartTimeErrors = (startTime: number, endTime: number): string | null => {
    if (startTime < 17) {
        return "Start time must be 5:00pm or later.";
    }


    if (endTime > 28 || endTime < 17 ) {
        return "End time must be no later than 4:00am";
    }

    if (startTime >= endTime) {
        return "Start time must be earlier than end time.";
    }

    return null;
}

const getAdjustedTime = (time: string) => {
    const hour = parseInt(time.split(":")[0]);
    const fractionalHour = parseInt(time.split(":")[1])/60;

    const timeAsANumber = hour + fractionalHour;

    return timeAsANumber <= 4 ? timeAsANumber + 24 : timeAsANumber;
}

export default babysitterCalculator;