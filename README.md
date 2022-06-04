# template-repos-ts-sol

# Installation

```bash
yarn
```

# Verifying a deployed contracts

## For a contract with no constructor arguments

Run hardhat-etherscan

```bash
yarn hardhat verify --network <NETWORK_NAME> <CONTRACT_ADDRESS>
```

## For a contract with constructor arguments

1. Create an arguments declaration file

```js
// cat ./scripts/arguments.js
module.exports = [
	'arguments 1',
	'arguments 2',
	'arguments 3',
	...
]
```

2. Run hardhat-etherscan

```bash
yarn hardhat verify --network <NETWORK_NAME> <CONTRACT_ADDRESS> --contract <PATH_TO_CONTRACT>:<CONTRACT_NAME> --constructor-args ./scripts/arguments.js
```
