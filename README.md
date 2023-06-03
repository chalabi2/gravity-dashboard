# Gravity Bridge Dashboard
This is a dashboard to view various Gravity Bridge statistics. It uses the [Gravity Info Api](https://github.com/Gravity-Bridge/gravity-info-api) to extract chain data and display it on the frontend.

### Install & Run
Simply fork the repository, enable github pages, and a github pages action will automatically run and deploy the application

### To do list
**V1**

* Compare Data. take every single bridge transaction, exctract denoms and their amounts for a 7 day period via block timestamp returns, then multiply by price, deliver one week time stamped data sets. Use one week data to create bridge volume graph line.
* Fix percent changes on bridge volume
* Add mobile resizing
* Fix Font
* Fix line elements
* Add Loading screen, make loading screen take slowest query return as isLoaded

**V2**
* Add wallet connect to show analytics for individual wallets
* Add IBC transfer data IE which chains are sending or receiving the most tokens to and from gravity.
* Add profitbale relay info
