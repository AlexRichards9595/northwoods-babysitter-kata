import babysitterCalculator from "./BabysitterCalculator";


describe("Babysitter Calculator", () => {
    describe("start time validation", () => {
        it("should return time form validation error if start time is not **:**", () => {
            const returnValue = babysitterCalculator("not proper structure", "17:05", "17:04");

            expect(returnValue).toBe("Time must be entered as HH:MM.");
        });

        it("should return time form validation error if start time is not HH:MM", () => {
            const returnValue = babysitterCalculator("not:correct", "17:05", "17:04");

            expect(returnValue).toBe("Time must be entered as HH:MM.");
        });

        it("should return start time error message if start time is earlier than 5:00pm", () => {
            const returnValue = babysitterCalculator("16:59", "17:05", "17:04");

            expect(returnValue).toBe("Start time must be 5:00pm or later.");
        });

        it("should not return start time error message if start time is 5:00pm", () => {
            const returnValue = babysitterCalculator("17:00", "17:05", "17:04");

            expect(returnValue).not.toBe("Start time must be 5:00pm or later.");
        });

        it("should not return start time error message if start time is after 5:00pm", () => {
            const returnValue = babysitterCalculator("17:01", "17:05", "17:04");

            expect(returnValue).not.toBe("Start time must be 5:00pm or later.");
        });
    });

    describe("end time validation", () => {
        it("should return time form validation error if endtime time is not **:**", () => {
            const returnValue = babysitterCalculator("17:05", "not proper structure", "17:06");

            expect(returnValue).toBe("Time must be entered as HH:MM.");
        });

        it("should return time form validation error if end time is not HH:MM", () => {
            const returnValue = babysitterCalculator("17:05", "not:correct", "17:04");

            expect(returnValue).toBe("Time must be entered as HH:MM.");
        });

        it("should return end time error message if endtime time hour is earlier than start time", () => {
            const returnValue = babysitterCalculator("18:00", "17:01", "17:04");

            expect(returnValue).toBe("Start time must be earlier than end time.");
        });

        it("should return end time error message if endtime time is earlier than start time", () => {
            const returnValue = babysitterCalculator("17:05", "17:01", "17:04");

            expect(returnValue).toBe("Start time must be earlier than end time.");
        });

        it("should return end time error message if endtime time is the same time as start time", () => {
            const returnValue = babysitterCalculator("17:05", "17:05", "17:04");

            expect(returnValue).toBe("Start time must be earlier than end time.");
        });

        it("should return end time error message if endtime time is before 5pm and later than 4am hour", () => {
            const returnValue = babysitterCalculator("17:05", "05:00", "17:04");

            expect(returnValue).toBe("End time must be no later than 4:00am");
        });

        it("should return end time error message if endtime time is before 5pm and in the 4am hour", () => {
            const returnValue = babysitterCalculator("17:05", "04:18", "17:04");

            expect(returnValue).toBe("End time must be no later than 4:00am");
        });

        it("should not return end time error message if endtime time is 4am", () => {
            const returnValue = babysitterCalculator("17:05", "04:00", "17:04");

            expect(returnValue).not.toBe("End time must be no later than 4:00am");
        });

        it("should not return end time error message if endtime time is earlier than 4am", () => {
            const returnValue = babysitterCalculator("17:05", "03:59", "17:04");

            expect(returnValue).not.toBe("End time must be no later than 4:00am");
        });
    });

    describe("bedTime validation", () => {
        it("should return time form validation error if bedTime time is not **:**", () => {
            const returnValue = babysitterCalculator("17:05", "17:06", "not proper structure");

            expect(returnValue).toBe("Time must be entered as HH:MM.");
        });

        it("should return time form validation error if end time is not HH:MM", () => {
            const returnValue = babysitterCalculator("17:05",  "17:06", "not:correct");

            expect(returnValue).toBe("Time must be entered as HH:MM.");
        });
    });

    describe("calculations with whole numbers", () => {
        it("should multiply total hours by preBedTime rate if bedtime is after endTime and endTime is before midnight", () => {
            const returnValue = babysitterCalculator("17:00", "19:00", "20:00");

            expect(returnValue).toBe("$24.00");
        });

        it("should only multiply by post bedtime rates if bedtime is before startTime and endTime is before midnight", () => {
            const returnValue = babysitterCalculator("18:00", "19:00", "17:00");

            expect(returnValue).toBe("$8.00");
        });

        it("should multiply pre-midnight/post-bedtime hours by 8 and add to existing cost if bedtime is after endTime and endtime is before midnight", () => {
            const returnValue = babysitterCalculator("17:00", "21:00", "20:00");

            expect(returnValue).toBe("$44.00");
        });

        it("should multiply post-midnight hours by 16 and add to existing cost if endTime is after midnight", () => {
            const returnValue = babysitterCalculator("17:00", "03:00", "20:00");

            expect(returnValue).toBe("$116.00");
        });
    });

    describe("calculations with fractional numbers", () => {
        it("should round down preBedTime to whole number if end time is before bedtime", () => {
            const returnValue = babysitterCalculator("17:30", "19:00", "20:00");

            expect(returnValue).toBe("$12.00");
        });

        it("should round down preMidnightCost to whole number if end time is before midnight and bedtime is before start time", () => {
            const returnValue = babysitterCalculator("17:30", "19:00", "17:00");

            expect(returnValue).toBe("$8.00");
        });

        it("should round down preMidnightCost to whole number if end time is before midnight", () => {
            const returnValue = babysitterCalculator("17:30", "22:00", "19:00");
            
            expect(returnValue).toBe("$38.00");
        });

        it("should multiply remaining time by postMidnight rate if end time is after midnight", () => {
            const returnValue = babysitterCalculator("17:22", "02:00", "19:00");
            expect(returnValue).toBe("$81.47");
        });

        it("should not round costs of phases if total hours is not fractional", () => {
            const returnValue = babysitterCalculator("17:00", "23:00", "19:30");
            
            expect(returnValue).toBe("$58.00");
        });
    });
});