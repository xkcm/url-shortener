import { CryptoService } from "../crypto/crypto.service";
import { LinksService } from "./links.service";

describe("LinksService", () => {
  let linksService = new LinksService(null, new CryptoService())

  describe("Creating new links", () => {
    it("should hash the destination correctly", () => {
      const destination = "https://www.geeksforgeeks.org/c-program-to-check-prime-number/"
      const hash = linksService.hashLink(destination)
      console.log(hash)
    })
  })
})