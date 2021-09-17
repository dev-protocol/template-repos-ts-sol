import { ethers } from 'hardhat'
import {
	Admin,
	Admin__factory,
	UpgradeableProxy,
	UpgradeableProxy__factory,
} from '../typechain'

export const deployAdmin = async (): Promise<Admin> => {
	const adminFactory = (await ethers.getContractFactory(
		'Admin'
	)) as Admin__factory
	const admin = await adminFactory.deploy()
	return admin.deployed()
}

export const deployProxy = async (
	impl: string,
	admin: string,
	data: Readonly<Uint8Array>
): Promise<UpgradeableProxy> => {
	const upgradeableProxyFactory = (await ethers.getContractFactory(
		'UpgradeableProxy'
	)) as UpgradeableProxy__factory
	const upgradeableProxy = await upgradeableProxyFactory.deploy(
		impl,
		admin,
		data
	)
	return upgradeableProxy.deployed()
}
