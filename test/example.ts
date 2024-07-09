import { expect } from 'chai'
import { ethers, upgrades } from 'hardhat'

describe('Example', () => {
	describe('initialize', () => {
		describe('success', () => {
			it('initialize value', async () => {
				const Example = await ethers.getContractFactory('Example')
				const example = await upgrades.deployProxy(Example, [3n])
				const value: bigint = await example.value()
				expect(value).to.equal(3n)
			})
		})
		describe('fail', () => {
			it('should fail to initialize when already initialized', async () => {
				const Example = await ethers.getContractFactory('Example')
				const example = await upgrades.deployProxy(Example, [3n])

				await expect(example.initialize(6)).to.be.revertedWithCustomError(
					example,
					'InvalidInitialization',
				)
				const value: bigint = await example.value()
				expect(value).to.equal(3n)
			})
		})
	})

	describe('add', () => {
		it('Add the passed value to `value`', async () => {
			const Example = await ethers.getContractFactory('Example')
			const example = await upgrades.deployProxy(Example, [1n])
			await example.add(10n)
			const value: bigint = await example.value()

			expect(value).to.equal(11n)
		})
	})
})
