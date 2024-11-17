import {
  type Address,
  type Client,
  getContract,
  type GetContractReturnType,
} from 'viem'
import { ABI } from 'abi/Counter'

export const abi = ABI
export const address = '0x25d731D13CFd24e2B9EC02229595BE7b5d1E1d6e'

class Counter<T extends Client> {
  public readonly contract: GetContractReturnType<typeof ABI, T, Address>

  constructor(
    public client: T,
    public readonly config: { address: Address; abi: typeof ABI } = {
      address,
      abi,
    },
  ) {
    this.contract = getContract({
      address: this.config.address,
      abi: this.config.abi,
      client: this.client,
    })
  }

  owner = async () => {
    return await this.contract.read.owner()
  }

  counter = async () => {
    return await this.contract.read.counter()
  }

  increase = async () => {
    // return await this.contract.write.increase({
    //   account: this.client.account!,
    // })
  }
}

export default Counter
