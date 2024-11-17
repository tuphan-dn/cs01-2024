import { loadFixture } from '@nomicfoundation/hardhat-toolbox-viem/network-helpers'
import { expect } from 'chai'
import { viem } from 'hardhat'
import { getAddress } from 'viem'

describe('contract', function () {
  async function deployFixture() {
    const counter = await viem.deployContract('Counter')
    const [owner, attacker] = await viem.getWalletClients()
    return { counter, owner, attacker }
  }

  describe('deploy counter', function () {
    it('deploy', async function () {
      const { counter, owner } = await loadFixture(deployFixture)
      expect(await counter.read.counter()).equal(0n)
      expect(await counter.read.owner()).hexEqual(owner.account.address)
    })
  })

  describe('interact with counter', function () {
    it('increase', async function () {
      const { counter, owner } = await loadFixture(deployFixture)
      await expect(counter.write.increase())
        .to.emit(counter, 'Increase')
        .withArgs(getAddress(owner.account.address), 1n)
      const re = await counter.read.counter()
      expect(re).equal(1n)
    })

    it('not increase', async function () {
      const { counter, attacker } = await loadFixture(deployFixture)
      await expect(
        counter.write.increase({ account: attacker.account }),
      ).to.be.revertedWithCustomError(counter, 'OwnableUnauthorizedAccount')
    })
  })
})
