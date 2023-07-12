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

    const preBedtimeCost = getPreBedtimeCost(adjustedBedTime, adjustedStartTime, adjustedEndTime);

    const preMidnightCost = getPreMidnightCost(adjustedEndTime, adjustedBedTime, adjustedStartTime);

    const postMidnightCost = getPostMidnightCost(adjustedEndTime);

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

function getPostMidnightCost(adjustedEndTime: number) {
    return adjustedEndTime > 24
        ? (adjustedEndTime - 24) * 16
        : 0;
}

function getPreBedtimeCost(adjustedBedTime: number, adjustedStartTime: number, adjustedEndTime: number) {
    if (adjustedBedTime > adjustedStartTime) {
        if (adjustedEndTime < adjustedBedTime) {
            return (adjustedEndTime - adjustedStartTime) * 12;
        } else {
            return (adjustedBedTime - adjustedStartTime) * 12;
        }
    }
    return 0;
}

function getPreMidnightCost(adjustedEndTime: number, adjustedBedTime: number, adjustedStartTime: number) {
    if (adjustedEndTime > adjustedBedTime) {
        if (adjustedEndTime > 24) {
            return (24 - adjustedBedTime) * 8;
        } else {
            if (adjustedBedTime > adjustedStartTime) {
                return (adjustedEndTime - adjustedBedTime) * 8;
            } else {
                return (adjustedEndTime - adjustedStartTime) * 8;
            }
        }
    }
    return 0;
}
