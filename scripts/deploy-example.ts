import { ethers } from 'hardhat'
import { deployAdmin, deployProxy } from './utils'

async function main() {
	const Example = await ethers.getContractFactory('Example')
	const example = await Example.deploy()

	const admin = await deployAdmin()

	const upgradeableProxy = await deployProxy(
		example.address,
		admin.address,
		ethers.utils.arrayify('0x')
	)

	console.log('Example address:', example.address)
	console.log('Admin address:', admin.address)
	console.log('UpgradeableProxy address:', upgradeableProxy.address)
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
