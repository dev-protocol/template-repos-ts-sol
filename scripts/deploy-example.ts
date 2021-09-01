import { ethers } from 'hardhat'

async function main() {

	const Example = await ethers.getContractFactory("Example");
	const example = await Example.deploy();

	console.log("Token address:", example.address);
}

main()
  	.then(() => process.exit(0))
  	.catch((error) => {
    	console.error(error);
    	process.exit(1);
})
