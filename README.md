# Babysitter Kata

This kata is designed to calculate the amount earned for one night of babysitting given the following several factors:
- starts no earlier than 5:00PM
- leaves no later than 4:00AM
- gets paid $12/hour from start-time to bedtime
- gets paid $8/hour from bedtime to midnight
- gets paid $16/hour from midnight to end of job
- gets paid for full hours (no fractional hours)

## Decisions and Thoughts
- I wrote a good amount of logic to validate that the time entered was in the correct form. Normally, I would just use some form validation on the inputs to help reduce some of this complexity. I also chose not to convert anything into a JS Date because it meant I had to handle a lot of the logic and that was more fun. 
- "no fractional hours" was vague and forced me to make some decisions on my own. Does that mean that only whole hours will be given? Each pay phase must be a complete hour to be counted? Or is the total time rounded down to the round number? I decided that each phase could be a fractional hour and calculated as such but any time in the last pay phase that runs past a whole hour for the total time will not be included in the price calculation. In other words, if the total time was X hours and 15 minutes, then 15 minutes was subtracted from the latest pay phase.
- The directions did not include what bed time was, so I assumed that was flexible AND that it could be before the start time or after the end time. Meaning that the baby sitter showed up after the kid was already asleep or the parents came back before the kid was asleep. 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
