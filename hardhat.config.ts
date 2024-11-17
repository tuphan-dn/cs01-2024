import type { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox-viem'
import 'hardhat-abi-exporter'
import 'hardhat-chai-matchers-viem'
import '@nomicfoundation/hardhat-ignition-viem'
import 'dotenv/config'

const config: HardhatUserConfig = {
  solidity: '0.8.27',
  abiExporter: {
    path: './abi',
    runOnCompile: true,
    clear: true,
    flat: true,
  },
  networks: {
    holesky: {
      url: process.env.RPC,
      accounts: [process.env.PRIVKEY || ''],
    },
  },
}

export default config
