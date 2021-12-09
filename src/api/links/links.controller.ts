import { Body, Controller, Post } from "@nestjs/common";
import { LinksService } from "./links.service";

@Controller("/api/links/")
export class LinksController {
  constructor(private linksService: LinksService){}

  @Post("generate")
  public async generateLink(
    @Body('destination') destinationLink: string
  ){
    this.linksService.checkIfExists(destinationLink)
  }

  @Post("get")
  public async getLink(){} 
}