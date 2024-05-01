# tornado_vis
Full tornado data 1950-2023 Visualization

Process
Data was obtained from NOAA's bulk data section (see resources for link)

Data was broken down by year, so 50 csv files were downloaded. Excel was used to filter each file for tornadoes only.

Python was used (Pandas/glob) to combine all files into a single dataframe in order to clean the data.




Resources
Combining multiple csvs into a single file using Pandas: https://www.geeksforgeeks.org/how-to-merge-multiple-excel-files-into-a-single-files-with-python/
NOAA bulk data: https://www.ncei.noaa.gov/pub/data/swdi/stormevents/csvfiles/
