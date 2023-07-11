import babysitterCalculator from "./BabysitterCalculator";


describe("Babysitter Calculator", () => {
    describe("start time", () => {
        it("should return start time error message if start time is earlier than 5:00pm", () => {
            const returnValue = babysitterCalculator("16:59", "17:05");

            expect(returnValue).toBe("Start time must be 5:00pm or later.")
        });

        it("should not return start time error message if start time is 5:00pm", () => {
            const returnValue = babysitterCalculator("17:00", "17:05");

            expect(returnValue).not.toBe("Start time must be 5:00pm or later.")
        });

        it("should not return start time error message if start time is after 5:00pm", () => {
            const returnValue = babysitterCalculator("17:01", "17:05");

            expect(returnValue).not.toBe("Start time must be 5:00pm or later.")
        });
    });

    describe("end time", () => {
        it("should return end time error message if endtime time hour is earlier than start time", () => {
            const returnValue = babysitterCalculator("18:05", "17:01");

            expect(returnValue).toBe("Start time must be earlier than end time.")
        });

        it("should return end time error message if endtime time is earlier than start time", () => {
            const returnValue = babysitterCalculator("17:05", "17:01");

            expect(returnValue).toBe("Start time must be earlier than end time.")
        });

        it("should return end time error message if endtime time is the same time as start time", () => {
            const returnValue = babysitterCalculator("17:05", "17:05");

            expect(returnValue).toBe("Start time must be earlier than end time.")
        });
    });
});