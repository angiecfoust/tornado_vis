
# Cyclonic Cartography

## Description/Overview
The topic we have chosen is tornado data across the US. We have opted to investigate multiple avenues including the number of tornadoes, their intensity and frequency. Living in Oklahoma, tornadoes are something nearly everyone can relate to in some way; learning more about them and presenting that information in an easily accessible/ understandable format would be highly educational.

As for our data, our data was obtained from NOAA's bulk data section (see resources for link). We gathered data from all the available years (1950-2024) and all available intensities (EF1-EF5).

## Instructions
1. Go to <a href="ADD LINK">Cyclonic Cartography</a>
2. Click on a category to see the visualizations


## Methodology
1. Finding the data
	- NOAA's National Weather Service had all the data we needed, data was broken down by year therefore 50 CSVs were downloaded. <a href="https://www.ncei.noaa.gov/pub/data/swdi/stormevents/csvfiles/">(Storm Events Database)</a>

2. Cleaning the data
	- First python was used (Pandas/glob) to combine all files into a single dataframe in order to prep the data for cleaning
  - We then dropped missing and unnecessary values, altered column names, and removed points outside of the contiguous US. Finally, we exported this newly cleaned data as a CSV into the 'Resources' folder
  - To make this data usable within the JavaScript visualizations, we converted the newly cleaned data into geojson format using a converter (see resources for link)

3. Setting up the HTML + CSS and deploying the servers
	- Since each visualization is contained within its own page we went through and created our own individual html and css documents (making sure to add the appropriate plugins and formatting)

*\/\/\/ probably update later \/\/\/\/*

***Since each team member created their visualizations independently we all took different approaches with our methodologies; our independent workflows within the code itself is outlined more clearly within the <a href="">js files</a>***

4. Creating the final index.html page

## Tableau Dashboard
(ADD METHODOLOGY/ DESCRIPTION AND IMAGE/S OF FINAL DASHBOARD)

## Files
### Static folder

Contains all the javascript files the team used to create their visualizations as well as the data (geojson files) and css documents required to create them

- *ADD JS FILE/S AND LINK/S WHEN DONE*
- tornadoAlley.geojson
	- The geojson file used in the *(MAP)*.js code to create the polygon shape representing tornado alley
- merged_tornado_data.ipynb + final_data.geojson *(MAY NEED UPDATED LATER)*
	- The main data source (converted from CSVs) used throughout all the visualizations 

### HTML files

- **index.html**
[Landing page](ADD LINK)

- **MAP.html**
![a screenshot of the visualization](ADD IMAGE LINK)

### Resources folder

Contains all the CSV (cleaned and uncleaned) files that were later converted into geojson files (located in the static folder)


### Other Files

- data_cleaning.ipynb
  - The jupyter notebook file containing all the data cleaning for this project


## Acknowledgements
- <a href="https://github.com/brupps">Barb Rupps</a>
- <a href="https://github.com/angiecfoust">Angie Foust </a>
- <a href="https://github.com/cassidysimmons">Cassidy Simmons </a>
- <a href="https://github.com/ASPigman">Amanda Pigman </a>


## Resources
- <a href= "https://www.ncei.noaa.gov/pub/data/swdi/stormevents/csvfiles/">NOAA bulk data</a>
- <a href="https://www.geeksforgeeks.org/how-to-merge-multiple-excel-files-into-a-single-files-with-python/">Combining multiple csvs into a single file using Pandas</a>
- <a href="https://www.accuweather.com/en/severe-weather/is-tornado-alley-shifting-east/1162839">Accuweather for tornado alley shape </a>
- <a href="https://open-innovations.github.io/CSV2GeoJSON/">CSV to geoJSON converter</a>


