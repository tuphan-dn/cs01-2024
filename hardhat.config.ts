import { readFileSync, readdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import { task, type HardhatUserConfig } from 'hardhat/config'
import { generatePrivateKey } from 'viem/accounts'
import '@nomicfoundation/hardhat-toolbox-viem'
import 'hardhat-abi-exporter'
import 'hardhat-chai-matchers-viem'
import '@nomicfoundation/hardhat-ignition-viem'
import 'dotenv/config'

const abiExporterPath = './abi'

task('abi', 'Build typechain ABI').setAction(async () => {
  readdirSync(abiExporterPath)
    .filter((name) => /(\.json)$/.test(name))
    .forEach((name) => {
      const file = join(abiExporterPath, name)
      const abi = readFileSync(file, 'utf8')
      writeFileSync(
        file.replace(/(\.json)$/, '.ts'),
        abi
          .replace(/^\[/, 'export const ABI = [')
          .replace(/\]\n$/, '] as const;'),
      )
    })
})

const config: HardhatUserConfig = {
  solidity: '0.8.27',
  abiExporter: {
    path: abiExporterPath,
    runOnCompile: true,
    clear: true,
    flat: true,
  },
  networks: {
    holesky: {
      url: process.env.RPC || '',
      accounts: [process.env.PRIVKEY || generatePrivateKey()],
    },
  },
}

export default config
