import { randomBytes } from "crypto"
import { Bit, CryptoService } from "./crypto.service"

describe('CryptoService', () => {
  let cryptoService = new CryptoService()

  describe('comparing hashes', () => {
    it('should compare correctly valid hash', async () => {
      const plainText = randomBytes(2**10).toString('hex')
      const hash = await cryptoService.createHash(plainText)
      const comparison = cryptoService.compareHash(plainText, hash)
      expect(comparison).toBeTruthy()
    })
    it('should generate valid hash', () => {
      const plainText = randomBytes(2**10).toString('hex')
      const hash = cryptoService.SHA256(plainText)
      expect(hash.length).toEqual(64)
    })
  })
  describe("Bitwise operations", () => {
    it('should shift bits correctly', () => {
      const bits: Bit[] = [1, 0, 0, 0, 1, 1, 1, 0, 1]
      const shifted = cryptoService.shiftBits(bits, 2)
      expect(shifted).toEqual([0, 0, 1, 0, 0, 0, 1, 1, 1])
    })
    it('should rotate bits correctly', () => {
      const bits: Bit[] = [1,1,0,0]
      const rotated = cryptoService.rotateBits(bits,5)
      expect(rotated).toEqual([0,1,1,0])
    })
    it('should add bits', () => {
      const bits1: Bit[] = [1,0]
      const bits2: Bit[] = [1,1]
      const sum = cryptoService.sumBits(bits1, bits2)
      expect(sum).toEqual([1,0,1])
    })
    it('should convert hex text to bits', () => {
      const hexText = "ff"
      const bits = cryptoService.hexToBits(hexText)
      expect(bits).toEqual(new Array(8).fill(1))
    })
    it("should convert bits to hex", () => {
      const bits: Bit[] = [1,1,1,1,1,1,1,0]
      const hex = cryptoService.partitionBitsToHex(bits)
      expect(hex).toEqual("fe")
    })
    it("should convert bits to dec", () => {
      const bits: Bit[] = [1,1,1,0]
      const hex = cryptoService.bitsToDec(bits)
      expect(hex).toEqual(14)
    })
    it("should partition the bits", () => {
      const bits: Bit[] = [1,1,0,1]
      const partitioned = cryptoService.partitionBits(bits, 2)
      expect(partitioned).toEqual([[1,1], [0,1]])
    })
    it("should xor two bytes", () => {
      const byte1: Bit[] = [1,0,1,1,0,0,1,0]
      const byte2: Bit[] = [0,0,1,0,1,0,1,0]
      const xored = cryptoService.xor(byte1, byte2)
      expect(xored).toEqual([1,0,0,1,1,0,0,0])
    })
  })
})
