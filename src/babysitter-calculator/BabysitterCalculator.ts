const MIDNIGHT = 24;
const PRE_BEDTIME_RATE = 12;
const PRE_MIDNIGHT_RATE = 8;
const POST_MIDNIGHT_RATE = 16;

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

    const preBedtimeTime = getPreBedtimeTime(adjustedBedTime, adjustedStartTime, adjustedEndTime);
    const preMidnightTime = getPreMidnightTime(adjustedEndTime, adjustedBedTime, adjustedStartTime);
    const postMidnightTime = getPostMidnightTime(adjustedEndTime, adjustedStartTime);

    const cost = getFractionalTimeCost(adjustedEndTime, adjustedStartTime, preBedtimeTime, preMidnightTime, postMidnightTime);

    return `$${cost.toFixed(2)}`;
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

const getPostMidnightTime = (adjustedEndTime: number, adjustedStartTime: number) => {
    if (adjustedEndTime < MIDNIGHT) {
        return 0;
    }
        
    return (adjustedEndTime - MIDNIGHT);
}

const getPreBedtimeTime = (adjustedBedTime: number, adjustedStartTime: number, adjustedEndTime: number) => {
    if (adjustedBedTime < adjustedStartTime) {
        return 0;
    }
    
    if (adjustedEndTime < adjustedBedTime) {
        return (adjustedEndTime - adjustedStartTime);
    }
        
    return (adjustedBedTime - adjustedStartTime);
}

const getPreMidnightTime = (adjustedEndTime: number, adjustedBedTime: number, adjustedStartTime: number) => {
    if (adjustedEndTime < adjustedBedTime) {
        return 0;
    }
    
    if (adjustedEndTime < MIDNIGHT) {
        if (adjustedBedTime > adjustedStartTime) {
            return (adjustedEndTime - adjustedBedTime);
        } else {
            return (adjustedEndTime - adjustedStartTime);
        }
    }

    return (MIDNIGHT - adjustedBedTime);
}

const getFractionalTimeCost = (endTime: number, startTime: number, preBedtimeTime: number, preMidnightTime: number, postMidnightTime: number): number => {
    const totalTime = endTime - startTime;

    if(Number.isInteger(totalTime)) {
        return (preBedtimeTime * 12) + (preMidnightTime * 8) + (postMidnightTime * 16);
    }

    if(postMidnightTime !== 0) {
        const remainingTime = Math.floor(totalTime) - preBedtimeTime - preMidnightTime;
        return (preBedtimeTime * 12) + (preMidnightTime * 8) + (remainingTime * 16);
    }

    if(preMidnightTime !== 0) {
        if(preBedtimeTime !== 0) {
            const remainingTime = Math.floor(totalTime) - preBedtimeTime;
            return (preBedtimeTime * 12) + (remainingTime * 8);
        } else {
            return (Math.floor(preMidnightTime) * 8) + (postMidnightTime * 16);
        }
    }

    return Math.floor(preBedtimeTime) * 12;
}
