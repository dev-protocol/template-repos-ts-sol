/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import {ethers} from 'ethers'
import Provider = ethers.providers.Provider

const deployContracts = async (_wallet: ethers.Wallet): Promise<void> => {}

const getDeployer = (
	deployMnemonic?: string,
	deployNetwork = 'local',
	deployLocalUrl = 'http://127.0.0.1:8545'
): ethers.Wallet => {
	if (!deployMnemonic) {
		throw new Error(
			`Error: No DEPLOY_MNEMONIC env var set. Please add it to .<environment>.env file it and try again. See .env.example for more info.\n`
		)
	}

	// Connect provider
	const provider: Provider =
		deployNetwork === 'local'
			? new ethers.providers.JsonRpcProvider(deployLocalUrl)
			: ethers.getDefaultProvider(deployNetwork)

	return ethers.Wallet.fromMnemonic(deployMnemonic).connect(provider)
}

const deploy = async (): Promise<void> => {
	const mnemonic = process.env.DEPLOY_MNEMONIC
	const network = process.env.DEPLOY_NETWORK
	const deployLocalUrl = process.env.DEPLOY_LOCAL_URL
	const wallet = getDeployer(mnemonic, network, deployLocalUrl)

	console.log(`Deploying to network [${network ?? 'local'}] in 5 seconds!`)
	await deployContracts(wallet)
}

void deploy()
