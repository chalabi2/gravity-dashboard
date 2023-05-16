# Gravity Bridge Dashboard
This is a dashboard to view various Gravity Bridge statistics. It uses the [Gravity Info Api](https://github.com/Gravity-Bridge/gravity-info-api) to extract chain data and display it on the frontend.

### Install & Run
Simply fork the repository, enable github pages, and a github pages action will automatically run and deploy the application

### To do list
Data Missing:
* Average Chain & Bridge Fee - take the total amounts from each denom then divide it by the amount of transactions for that denom then add all the USD values from each divided denom together then divide by total amount of denoms
* Common Chain & Bridge Fee - Whichever token has the highest average usd in each chain and bridge category
* Total Bridge Volume & TVL - take the logic from gravity info api for volume, make it recursive, make it save to a data base every months average ala transactions. implement the exact same logic from volume afterwards but instead of erc20 transfer events for the bridge look at locked events
* Compare Data - once recursive bridge data is done, find a way to collect axelar and other bridge volume, display it monthly. 