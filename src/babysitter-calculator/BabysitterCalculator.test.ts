import babysitterCalculator from "./BabysitterCalculator";


describe("Babysitter Calculator", () => {
    it("should return start time error message if start time earlier than 5:00pm", () => {
        const returnValue = babysitterCalculator("16:59");

        expect(returnValue).toBe("Start time must be 5:00pm or later.")
    });

    it("should not return start time error message if start time is 5:00pm", () => {
        const returnValue = babysitterCalculator("17:00");

        expect(returnValue).not.toBe("Start time must be 5:00pm or later.")
    })

    it("should not return start time error message if start time is after 5:00pm", () => {
        const returnValue = babysitterCalculator("17:01");

        expect(returnValue).not.toBe("Start time must be 5:00pm or later.")
    })
});