# leaflet-challenge
A project to develop a visualization for USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

The project is divided into two parts:

Part 1: Create the Earthquake Visualization (Mandatory)

Part 2: Gather and Plot More Data (Optional)

## Acknowledgements

- Dataset created by the United States Geological SurveyLinks to an external site..



## Features of Part-1 Earthquake visualization

- Got the JSON representation  of the dataset - "All Earthquakes from the Past 7 Days" by using the URL of this JSON to pull in the data for the visualization - "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"; Used D3 library to get the json data from the url.

- Using Leaflet, created a map that plots all the earthquakes from the dataset based on their longitude and latitude on a grayscale tilelayer. 
It includes the following charateristics in the viualization:

- Earthquake Data markers reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.

- Included popups that provide additional information about the earthquake when its associated marker is clicked.

- Created a legend that provides context for the map data. Updated the .css file for legend class layout and appearance.


## Features of Part-2 Gather and Plot More Data

- In addition to the Part-1 visualization, plotted a second dataset on the map to illustrate the relationship between tectonic plates and seismic activity. Pulled the data on tectonic plates from https://github.com/fraxen/tectonicplatesLinks and used D3 library to import the json data.

It includes the following caharacteristics in the visualization:

- plotted the tectonic plates dataset on the map in addition to the earthquakes.

- Added other base maps like Satellite and Outdoors to choose from.

- Put each dataset (Earthquakes and Tectonic plates) into separate overlays that can be turned on and off independently.

- Added layer controls to the map.

