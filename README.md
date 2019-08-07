# IPEDS Data Parser
A lightweight JavaScript parser for IPEDS NCES data parsing.

## Getting Started
To get started with this tool, first download all of the data you want to use locally and place it in the ```files``` directory of this project.

### Using the Script

#### FILES.csv

In order to use this script, edit ```FILES.csv``` and add all of the CSV files you are going to parse in the file in this format:

```
file1,file2,file3,file4
```

DO NOT INCLUDE FILE EXTENSIONS. THEY ARE ASSUMED TO BE PROPERLY FOMRATTED CSV.

#### VARLIST.csv

It is recommended not to edit this file unless you know what you are doing. This file contains the definition of the variables from most of the IPEDS NCES dictionaries. 

It is only advisable to edit this file when you know how to edit CSV and only to add a variable definition or edit the text associated with a variable definition.

#### Running the Script

For this script to work, it must be run on a server, whether it be through LiveServer or XAMPP, etc. because it uses the Fetch API, and ```file:///``` is not supported in the Fetch API.

### Reading Your Data

You will be able to download your parsed data in a JSON file that will linked to once the script is finished running.

The parsed data is also available for preview in the console because it may be easier to check in the console versus reading raw JSON.

## Examples

If you clone or download this repository, you can run the script with the two files included in the repo from the IPEDS Data Center (```hd2017.csv``` and ```ic2017.csv```)

## Troubleshooting

If there are any issues, or your files will not parse, look that your files are properly formatted.

Second, check that you are not putting too much data into the script and running out of memory.

## Resources
* [IPEDS NCES Data Center](https://nces.ed.gov/ipeds/datacenter/DataFiles.aspx) - Where to Get Your CSV Files