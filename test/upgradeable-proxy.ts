/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { expect, use } from 'chai'
import { ethers } from 'hardhat'
import { solidity } from 'ethereum-waffle'
import { deploy, deployProxy } from './utils'
import { Example, UpgradeableProxy } from '../typechain'

use(solidity)

describe('UpgradeableProxy', () => {
	const init = async (): Promise<[UpgradeableProxy, Example, Example]> => {
		const data = ethers.utils.arrayify('0x')
		const example = await deploy<Example>('Example')
		const [owner, addr1] = await ethers.getSigners()
		const proxy = await deployProxy(example.address, owner.address, data)
		const proxified = example.attach(proxy.address).connect(addr1)
		await proxified.initialize(3)

		return [proxy, example, proxified]
	}

	describe('upgradeTo', () => {
		describe('success', () => {
			it('upgrade logic contract', async () => {
				const [proxy, impl] = await init()
				const impl1 = await proxy.callStatic.implementation()
				const nextImpl = await deploy<Example>('Example')
				await proxy.upgradeTo(nextImpl.address)
				const impl2 = await proxy.callStatic.implementation()
				expect(impl1).to.not.equal(impl2)
				expect(impl1).to.equal(impl.address)
				expect(impl2).to.equal(nextImpl.address)
			})

			it('storing data', async () => {
				const [proxy, , proxified] = await init()
				await proxified.add(2)
				const nextImpl = await deploy<Example>('Example')
				await proxy.upgradeTo(nextImpl.address)
				const value = await proxified.value()
				expect(value).to.equal(3 + 2)
			})
		})
		describe('fail', () => {
			it('should fail to upgrade when the caller is not admin', async () => {
				const [proxy, impl] = await init()
				const nextImpl = await deploy<Example>('Example')
				const [, addr1] = await ethers.getSigners()
				const res = await proxy
					.connect(addr1)
					.upgradeTo(nextImpl.address)
					.catch((err: Error) => err)
				const impl1 = await proxy.callStatic.implementation()
				expect(res).to.be.instanceOf(Error)
				expect(impl1).to.be.equal(impl.address)
			})
		})
	})
})
