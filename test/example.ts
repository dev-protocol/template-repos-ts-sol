/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { expect, use } from 'chai'
import { BigNumber } from 'ethers'
import { solidity } from 'ethereum-waffle'
import { deploy, toBigNumber } from './utils'
import { Example } from '../typechain'

use(solidity)

describe('Example', () => {
	describe('value', () => {
		it('0 by default', async () => {
			const example = await deploy<Example>('Example')
			const value: BigNumber = await example.value()
			expect(value.toString()).to.equal('0')
		})
	})

	describe('initialize', () => {
		describe('success', () => {
			it('initialize value', async () => {
				const example = await deploy<Example>('Example')
				await example.initialize(3)
				const value: BigNumber = await example.value()
				expect(value.toString()).to.equal('3')
			})
		})
		describe('fail', () => {
			it('should fail to initialize when already initialized', async () => {
				const example = await deploy<Example>('Example')
				await example.initialize(3)

				await expect(example.initialize(6)).to.be.revertedWith(
					'Initializable: contract is already initialized'
				)
				const value: BigNumber = await example.value()
				expect(value.toString()).to.equal('3')
			})
		})
	})

	describe('add', () => {
		it('Add the passed value to `value`', async () => {
			const example = await deploy<Example>('Example')
			await example.add(toBigNumber(10).pow(18))
			const value: BigNumber = await example.value()

			expect(value.toString()).to.equal(toBigNumber(10).pow(18).toString())
		})
	})
})
