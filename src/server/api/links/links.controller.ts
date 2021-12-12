import { Body, Controller, Delete, Get, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { LinkInfoIncorrectPassError, LinkInfoNotFoundError } from "./links.errors";
import { LinksService } from "./links.service";

@Controller("/api/link/")
export class LinksController {
  constructor(private linksService: LinksService){}

  @Post()
  public async generateLink(
    @Body('destination') destinationLink: string
  ){
    const exists = await this.linksService.checkIfExists(destinationLink)
    if (exists) return { hash: exists }
    const info = await this.linksService.addNewLink(destinationLink)
    return info
  }

  @Get()
  public async getLink(
    @Body('hash') hash: string,
    @Res() res: Response
  ){
    const destination = await this.linksService.getDestination(hash)
    if (!destination) return res.status(404).end()
    await this.linksService.incrementViews(hash)
    return res.json({ destination }).end()
  }

  @Delete()
  public async deleteLink(
    @Body('hash') hash: string,
    @Body('pass') pass: string,
    @Res() res: Response
  ){
    try {
      await this.linksService.deleteLink(hash, pass)
      return res.status(200).end()
    } catch(error) {
      if (error instanceof LinkInfoIncorrectPassError) return res.status(403).end()
      if (error instanceof LinkInfoNotFoundError) return res.status(404).end()
      return res.status(400).end()
    }
  }

  @Get('stats')
  public async getStats(
    @Body('hash') hash: string,
    @Body('pass') pass: string,
    @Res() res: Response
  ){
    try {
      const stats = await this.linksService.getStats(hash, pass)
      return res.json(stats).end()
    } catch (error) {
      if (error instanceof LinkInfoNotFoundError) return res.status(404).end()
      if (error instanceof LinkInfoIncorrectPassError) return res.status(403).end()
      return res.status(400).end()
    }
  }
  
}