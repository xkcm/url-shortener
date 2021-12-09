import { Injectable } from "@nestjs/common";
import { partition } from "../../utils/common";
import { RedisService } from "../../redis.service";
import { CryptoService } from "../crypto/crypto.service";

type LinkInfo = {
  destination: string;
  views: number;
  pass: string;
  hash: string;
};

@Injectable()
export class LinksService {
  
  constructor(private redis: RedisService, private crypto: CryptoService){}

  private constructRedisKey(hash: string) {
    return `link@${hash}`
  }

  public hashLink(destination: string){
    const availableCharacters = "abcdefghijklmnopqrstvuwxyzABCDEFGHIJKLMNOPQRSTVUWXYZ0123456789_-"
    const size = 384
    const shaHash = this.crypto.SHA256(destination)
    let bits = this.crypto.hexToBits(shaHash)
    bits = bits.concat(bits.slice(0, 128))
    const partitionedBits = partition(this.crypto.partitionBits(bits, 6), size / (8*6))
    const hash = partitionedBits.map((bits) => {
      const b1 = this.crypto.sliceBits(this.crypto.sumBits(
        bits[0],
        this.crypto.rotateBits(bits[1], 5)
      ), 6)
      const b2 = this.crypto.xor(
        b1,
        this.crypto.shiftBits(bits[2], 3),
        this.crypto.rotateBits(bits[0], 4),
        this.crypto.shiftBits(bits[3], 2)
      )
      const b3 = this.crypto.sliceBits(this.crypto.sumBits(
        b2, b1
      ), 6)
      const b4 = this.crypto.sliceBits(this.crypto.sumBits(
        this.crypto.xor(
          this.crypto.sumBits(b3, b2),
          this.crypto.sumBits(bits[4], bits[3])
        ),
        this.crypto.xor(
          this.crypto.shiftBits(b3, 4),
          this.crypto.rotateBits(b1, 2),
          this.crypto.shiftBits(bits[1], 1)
        )
      ), 6)
      const f = this.crypto.sliceBits(this.crypto.sumBits(
        this.crypto.xor(b1, b3),
        this.crypto.xor(b2, b4)
      ), 6)
      const n = this.crypto.bitsToDec(f)
      return availableCharacters[n]
    }).join('')
    return hash
  }

  public async checkIfExists(destination: string) {
    const hash = this.hashLink(destination)
    const key = this.constructRedisKey(hash)
    return await this.redis.exists(key)
  }

  public async addNewLink(destination: string){
    const hash = this.hashLink(destination)
    const newLink: LinkInfo = {
      destination,
      views: 0,
      pass: this.crypto.randomSHA256(),
      hash
    }
    const key = this.constructRedisKey(hash)
    return this.redis.setPlainObject(key, newLink)
  }

  public async getLinkInfo(hash: string) {
    const key = this.constructRedisKey(hash)
    return this.redis.getPlainObject<LinkInfo>(key)
  }

}