// this function implements a smart scheduler that adjusts the timing of sensor data publishing based on the actual time taken for the previous execution, compensating for any drift in the expected interval.

function startSmartScheduler(sensor, callback) {
// The function takes a sensor configuration object and a callback function which we we want to execute at regular intervals defined by the sensor's smart timing logic

  const interval = sensor.interval;
  let lastScheduledTime = Date.now();
  // it stores the last time the callback was scheduled to run, initialized to the current time


  // scheduleNext is a recursive function that schedules the next execution of the callback and then schedule itself again after the appropriate delay in a recursive loop
  // This allows the scheduler to adjust dynamically based on the actual execution time of the callback
  // and the drift from the expected interval, ensuring that the callback is executed at the correct intervals even if there are delays or variations in execution time.
  // This function implements a smart scheduler that adjusts the timing of sensor data publishing based on the actual time taken for the previous execution, compensating for any drift in the expected interval.
  const scheduleNext = () => {
    const now = Date.now(); // Get the current time in milliseconds when the function is called
    const expectedNextTime = lastScheduledTime + interval;  // the ideal next time the callback should be executed based on the last scheduled time and the interval
    const delay = Math.max(0, expectedNextTime - now);
// delay is the time we need to wait before executing the callback, ensuring that we do not execute it too early
    // If the delay is negative, it means we are behind schedule, so we set it to 0 to avoid negative timeouts
    // This ensures that we only wait for the necessary time to align with the expected next execution time.
    // If we are early it waits until the expected next time, if we are late it waits for 0 ms to catch up
    const actualElapsed = now - lastScheduledTime;
    const drift = actualElapsed - interval;
    const compensation = delay; // Already accounts for drift

    console.log(`[SmartScheduler] 
  Time: ${new Date().toLocaleTimeString()}
  Expected Interval: ${interval} ms
  Actual Elapsed: ${actualElapsed} ms
  Drift: ${drift >= 0 ? "+" : ""}${drift} ms
  Compensation Applied: ${compensation} ms
  Last Scheduled Time: ${new Date(lastScheduledTime).toLocaleTimeString()}
  Expected Next Time: ${new Date(expectedNextTime).toLocaleTimeString()}
  Delay until next publish: ${delay} ms`);

  // setTimout is used to schedule the callback execution after the calculated delay
  // It uses the delay to ensure that the callback is executed at the correct time, compensating for any drift in the expected interval
  // The callback is executed with the sensor object and an object containing the expected publish time
  // This allows the callback to know when it was expected to be executed, which can be useful for logging or further adjustments
  // The callback is executed with the sensor object and an object containing the expected publish time
    setTimeout(async () => {
      const actualCallbackTime = Date.now();
      const actualDrift = actualCallbackTime - expectedNextTime;

      console.log(`[DEBUG] Scheduled delay: ${compensation} ms, Real delay: ${actualCallbackTime - now} ms`);
      console.log(`[DEBUG] Drift from expected time: ${actualDrift >= 0 ? "+" : ""}${actualDrift} ms\n`);

      // Update the last scheduled time to the expected next time after the callback is executed
      // This ensures that the next execution is scheduled based on the actual time the callback was executed
      // This allows the scheduler to adjust dynamically based on the actual execution time of the callback
      lastScheduledTime = expectedNextTime;

      await callback(sensor, { expectedPublishTime: expectedNextTime });

      // After the callback is executed, we schedule the next execution , we recursively call scheduleNext to continue the scheduling process
      // This allows the scheduler to continue running indefinitely, adjusting the timing based on the actual execution time of the callback
      scheduleNext();
    }, delay);
  };

  scheduleNext();
}


module.exports = { startSmartScheduler };