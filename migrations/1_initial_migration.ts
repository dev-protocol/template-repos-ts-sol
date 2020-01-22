const Migrations = artifacts.require('Migrations')

const handler = function(deployer) {
	deployer.deploy(Migrations)
} as Truffle.Migration

export = handler
