# template-repos-ts-sol

Template repository for using TypeScript and Solidity

# Usage

Create a repository using this template; just runs following command.

```bash
npm i
```

## How to use this without Solidity

Remove unnecessary dependencies:

```bash
npm rm ethlint prettier-plugin-solidity truffle truffle-hdwallet-provider truffle-typings ts-node typechain
```

Then, edit `script` in `package.json` as follows:

```json
{
	"scripts": {
		"test": "",
		"lint": "npm run lint:eslint && npm run lint:format",
		"lint:eslint": "eslint . --ext .ts,.js --fix --ignore-pattern node_modules/ --ignore-pattern types/",
		"lint:format": "prettier --write '**/*.{js,json,md,yml}'"
	}
}
```

Also, remove some unnecessary configuration properties:

- `overrides` in `.eslintrc.json`
- `overrides` in `.prettierrc.json`
- `compilerOptions.typeRoots` in `tsconfig.json`
- `compilerOptions.types` in `tsconfig.json`

Then, remove following unnecessary configuration in `.gitignore` and `.prettierignore`:

`.gitignore`:

```
# output of typechain
build
types
```

`.prettierignore`:

```
build
contracts/modules
```

Finally, remove unnecessary files:

```bash
rm .soliumignore .soliumrc.json truffle-config.js
```
