import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/equip_attribute')
  equipAttribute(@Body() params: any) {
    return this.appService.equipAttribute(params.fusion);
  }
}
