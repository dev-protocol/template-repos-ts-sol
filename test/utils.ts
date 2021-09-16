/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from 'hardhat'
import { Contract, BigNumber } from 'ethers'
import { UpgradeableProxy, UpgradeableProxy__factory } from '../typechain'

export const deploy = async <C extends Contract>(name: string): Promise<C> => {
	const factory = await ethers.getContractFactory(name)
	const contract = await factory.deploy()
	await contract.deployed()
	return contract as C
}

export const deployProxy = async (
	logic: string,
	admin: string,
	data: Readonly<Uint8Array>
): Promise<UpgradeableProxy> => {
	const factory = (await ethers.getContractFactory(
		'UpgradeableProxy'
	)) as UpgradeableProxy__factory
	const contract = await factory.deploy(logic, admin, data)
	await contract.deployed()
	return contract
}

export const toBigNumber = (v: string | number | BigNumber): BigNumber =>
	BigNumber.from(v)
