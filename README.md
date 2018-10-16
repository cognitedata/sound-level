# sound-level
An example of using the CDP as a base for sound level measurements.

## How it works:

### Measure an area
1. Click "Start new measurement"
2. Walk to a location
3. Click "Measure"
4. Save measurement
5. Repeat from 2. until finished
6. Click "End measurement"

### View previous measurements
1. Select the measurement to view from the dropdown box
2. Select the wanted map view


## CDP technical details

### Recording
 - A CDP Event is created for each measurement session. The start time is set when the user clicks "Start new measurement". Then end time is initially set to the same time.
 - When a sound level has been recorded on the device, timeseries data is sent to CDP
  - Sound level
  - GPS latitude
  - GPS longitude
  and the end time of the CDP event is updated to match the time of this latest sound level measurement

### Viewing
 - All sound-level events are read
 - For each event, add an item to the session dropdown list
 - When a user selects a session, read the start and end time of the event, and query the correspoding time series data
 - Finally plot the data on the map


