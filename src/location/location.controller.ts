import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateLocationDto } from '../dto/create-location.dto';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(public locationService: LocationService) {}

  @Post('add-location')
  @UsePipes(ValidationPipe)
  create_location(
    @Body() create_location_dto: CreateLocationDto,
  ): Promise<object> {
    return this.locationService.create_location(create_location_dto);
  }
}
