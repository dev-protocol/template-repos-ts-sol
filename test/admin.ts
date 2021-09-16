/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { expect, use } from 'chai'
import { ethers } from 'hardhat'
import { constants } from 'ethers'
import { solidity } from 'ethereum-waffle'
import { deploy, deployProxy } from './utils'
import { Example, Admin, UpgradeableProxy } from '../typechain'

use(solidity)

describe('Admin', () => {
	const init = async (): Promise<
		[UpgradeableProxy, Example, Example, Admin]
	> => {
		const data = ethers.utils.arrayify('0x')
		const example = await deploy<Example>('Example')
		const admin = await deploy<Admin>('Admin')
		const proxy = await deployProxy(example.address, admin.address, data)
		const proxified = example.attach(proxy.address)
		await proxified.initialize(3)

		return [proxy, example, proxified, admin]
	}

	describe('upgrade', () => {
		describe('success', () => {
			it('upgrade logic contract', async () => {
				const [proxy, impl, , proxyAdmin] = await init()
				const impl1 = await proxyAdmin.getProxyImplementation(proxy.address)
				const nextImpl = await deploy<Example>('Example')
				await proxyAdmin.upgrade(proxy.address, nextImpl.address)
				const impl2 = await proxyAdmin.getProxyImplementation(proxy.address)
				expect(impl1).to.not.equal(impl2)
				expect(impl1).to.equal(impl.address)
				expect(impl2).to.equal(nextImpl.address)
			})
		})
		describe('fail', () => {
			it('should fail to upgrade when the caller is not admin', async () => {
				const [proxy, , , proxyAdmin] = await init()
				const nextImpl = await deploy<Example>('Example')
				const [, addr1] = await ethers.getSigners()
				await expect(
					proxyAdmin.connect(addr1).upgrade(proxy.address, nextImpl.address)
				).to.be.revertedWith('Ownable: caller is not the owner')
			})
		})
	})
	describe('getProxyImplementation', () => {
		describe('success', () => {
			it('get implementation address', async () => {
				const [proxy, impl, , admin] = await init()
				const implementation = await admin.getProxyImplementation(proxy.address)
				expect(implementation).to.equal(impl.address)
			})
		})
		describe('fail', () => {
			it('get implementation address', async () => {
				const [proxy, , , proxyAdmin] = await init()
				const [, addr1] = await ethers.getSigners()
				await expect(
					proxyAdmin
						.connect(addr1)
						.upgrade(proxy.address, constants.AddressZero)
				).to.be.revertedWith('Ownable: caller is not the owner')
			})
		})
	})
	describe('getProxyAdmin', () => {
		describe('success', () => {
			it('get admin address', async () => {
				const [proxy, , , proxyAdmin] = await init()
				const impl = await proxyAdmin.getProxyAdmin(proxy.address)
				expect(impl).to.equal(proxyAdmin.address)
			})
			it('change admin address', async () => {
				const [proxy, , , proxyAdmin] = await init()
				const admin1 = await proxyAdmin.getProxyAdmin(proxy.address)
				expect(admin1).to.equal(proxyAdmin.address)
				const nextAdmin = await deploy<Admin>('Admin')
				await proxyAdmin.changeProxyAdmin(proxy.address, nextAdmin.address)
				const admin2 = await nextAdmin.getProxyAdmin(proxy.address)
				expect(admin2).to.equal(nextAdmin.address)
			})
		})
		describe('fail', () => {
			it('get admin address', async () => {
				const [proxy, , , proxyAdmin] = await init()
				const [, addr1] = await ethers.getSigners()
				await expect(
					proxyAdmin
						.connect(addr1)
						.changeProxyAdmin(proxy.address, constants.AddressZero)
				).to.be.revertedWith('Ownable: caller is not the owner')
			})
		})
	})
})
