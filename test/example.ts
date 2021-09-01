import { ethers } from "hardhat"
import { expect, use } from 'chai'
import { BigNumber, Contract, Signer } from 'ethers'
import { solidity } from 'ethereum-waffle'
import { toBigNumber } from './lib/number'
import { Example, Example__factory } from '../typechain'

use(solidity)

describe('Example', () => {
	let example: Example

	beforeEach(async () => {
	        const exampleFactory = (await ethers.getContractFactory("Example")) as Example__factory
		example = await exampleFactory.deploy()
	})

	describe('value', () => {
		it('0 by default', async () => {
			const value: BigNumber = await example.value()
			expect(value.toString()).to.equal('0')
		})
	})

	describe('add', () => {
		it('Add the passed value to `value`', async () => {
			await example.add(toBigNumber(10).pow(18))
			const value: BigNumber = await example.value()

			expect(value.toString()).to.equal(toBigNumber(10).pow(18).toString())
		})
	})
})
