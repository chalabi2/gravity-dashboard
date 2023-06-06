# Gravity Bridge Dashboard
This is a dashboard to view various Gravity Bridge statistics. It uses the [Gravity Info Api](https://github.com/Gravity-Bridge/gravity-info-api) to extract chain data and display it on the frontend.

### Install & Run
Simply fork the repository, enable github pages, and a github pages action will automatically run and deploy the application

### To do list
**V1**

* Add data caching
    - find price data once, spread to all functions needing price data
    - query all transactions once, spread all transactions to functions needing all transaction data
    - work around info.gravity & imperator price api rate limit/resource limit
* Add mobile resizing
* Add Loading screen, make loading screen take slowest query return as isLoaded

**V2**
* Add wallet connect to show analytics for individual wallets
* Add chart comparing gravity bridge to other cosmos bridges
* Add IBC transfer data IE which chains are sending or receiving the most tokens to and from gravity.
* Add profitbale relay info
