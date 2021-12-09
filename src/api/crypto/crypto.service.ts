import { Injectable } from "@nestjs/common";
import { hash, compare } from "bcrypt";
import { randomBytes } from "crypto";
import { sha256 } from "js-sha256";
import { InvalidHexString } from "./crypto.errors";

export type Bit = 0 | 1;

@Injectable()
export class CryptoService {
  private PEPPER = randomBytes(2**7).toString('hex') // TODO: change in production

  public createHash(value: string) {
    return hash(value + this.PEPPER, 12)
  }
  public compareHash(value: string, expectedHash: string) {
    return compare(value + this.PEPPER, expectedHash)
  }
  public SHA256(text: string){
    return sha256(text)
  }
  public randomSHA256(){
    return sha256(randomBytes(2**6).toString('hex'))
  }
  public emptyBits(n: number) {
    return new Array<Bit>(n).fill(0)
  }
  public bitsToDec(bits: Bit[]){
    const l = bits.length
    let res = 0
    for(let i = 0; i < l; i++) {
      const bit = bits[l-i-1]
      const p = Math.pow(2, i)*bit
      res += p
    }
    return res
  }
  public decToBits(num: number){
    const bits = []
    while (num > 0) {
      bits.unshift(num % 2)
      num = Math.floor(num/2)
    }
    return bits
  }
  public hexToBits(hexString: string){
    const bits: Bit[] = [];
    for (let c of hexString) {
      let num = parseInt(c, 16)
      if (num == NaN) throw new InvalidHexString(`Invalid hexString="${hexString}"`)
      const localBits = this.fixBitSize(this.decToBits(num), 4)
      bits.push(...localBits)
    }
    return bits
  }
  public fixBitSize(bits: Bit[], size: number){
    const l = bits.length
    if (size <= l) return bits
    return this.emptyBits(size-l).concat(bits)
  }
  public fixBitSizeFromEnd(bits: Bit[], size: number){
    const l = bits.length
    if (size <= l) return bits
    return bits.concat(this.emptyBits(size-l))
  }
  public partitionBitsToHex(bits: Bit[]){
    const partitions = this.partitionBits(bits, 4)
    return partitions.reduce<string>((s, c) => s+this.bitsToDec(c).toString(16), "")
  }
  public shiftBits(bits: Bit[], n: number) {
    const l = bits.length
    n = n % l
    return this.fixBitSize(this.sliceBits(bits, l-n), l)
  }
  public rotateBits(bits: Bit[], n: number){
    const l = bits.length
    n = n % l
    const newBits = []
    for (let i = 0; i < l; i++) {
      newBits.push(bits[(i + l - n) % l])
    }
    return newBits
  }
  public sliceBits(bits: Bit[], length: number) {
    return bits.slice(0, length)
  }
  public sliceBitsFromEnd(bits: Bit[], length: number) {
    return bits.slice(bits.length - length)
  }
  public sumBits(bits1: Bit[], bits2: Bit[]) {
    const l = Math.max(bits1.length, bits2.length)
    let carried = 0
    const result: Bit[] = []
    for (let i = l-1; i >=0; i--) {
      const bit1 = bits1[i] ?? 0
      const bit2 = bits2[i] ?? 0
      let res = bit1+bit2+carried
      if (res > 1) {
        carried = 1
        res = res % 2
      } else carried = 0
      result.unshift(res as Bit)
    }
    if (carried == 1) result.unshift(1)
    return result
  }
  public partitionBits(bits: Bit[], n: number){
    let l = bits.length
    const r = l % n
    if (r != 0) {
      bits = this.fixBitSize(bits, l+n-r)
      l += n-r
    }
    if (n >= l) return [bits]
    return bits.reduce<Bit[][]>((prev: Bit[][], cur: Bit, index) => {
      let i = index % n
      let a = i == 0 ? [] : prev[prev.length-1]
      if (i == 0) prev.push(a)
      a.push(cur)
      return prev
    }, [])
  }
  public xor(...bits: Bit[][]){
    const l = Math.max(...bits.map(bits => bits.length))
    const result = []
    for (let i = 0; i < l; i++){
      let lResult = bits[0][i]
      for (let j = 1; j < bits.length; j++) {
        lResult = (lResult ^ bits[j][i]) as Bit
      }
      result.push(lResult)
    }
    return result
  }
}