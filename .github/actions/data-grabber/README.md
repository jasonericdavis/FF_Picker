
## Before Committing Run the `npm build` Command

## action.yaml
This file give metadata about the action itself

## [vercel/ncc](https://github.com/vercel/ncc)
This package is used for compiling Node.js modules into a single file. In this case this eliminates the need to check in the node_modules folder

In the package.json build command this package is used to package the contents of the output of the typescript compilation to a `build` directory using the following command: `ncc build lib/main.js --license license.txt`

The license flags combines the licenses for all of the packages used into a single file.