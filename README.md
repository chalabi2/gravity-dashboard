# Gravity Bridge Dashboard
This is a dashboard to view various Gravity Bridge statistics. It uses the [Gravity Info Api](https://github.com/Gravity-Bridge/gravity-info-api) to extract chain data and display it on the frontend.

## Data Sanity
Data fetching can be rather subjective and in order to ensure at least two standard deviations from explicit accuracy a lot of this data was initially derived by hand then automated. Here is a breif explanation on how the data is fetched and handled.

* Total fees are gathered directly from transactions that are queried from an archive node with transaction history from block #408111 and onward.

* Average fees are all the fees added together denominated in $USD and divided by total amount of transactions for a given time frame.

* The amount of transactions in each time frame is calculated by looking at the transactions time stamp and filtering it **side-note, chain fees were enabled post gravity launch. 

* Highest fees are also gathered by iterating through every transaction with a fee in order to find the highest $USD value fee.

* Prices for the graviton token are fetched from coin gecko

* Prices for all other assets are fetched from the gravity info api which uses uniswap pools to derive prices for assets or the osmosis imperator api.

* Total bridge volume and total volume locked are fetched from the [dune dashboard](https://dune.com/jkilpatr/gravity-axelar-side-by-side)


### To do list:
**V1**
* Add mobile resizing
* Find price for nym & unification

**V2**
* Add wallet connect to show analytics for individual wallets
* Add chart comparing gravity bridge to other cosmos bridges
* Add IBC transfer data IE which chains are sending or receiving the most tokens to and from gravity.
* Add profitbale relay info
