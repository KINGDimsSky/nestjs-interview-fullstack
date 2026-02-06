import { PartialType } from '@nestjs/mapped-types';
import { CreateLaundryDto } from './create-laundry.dto';
import { IsOptional } from 'class-validator';

export class UpdateLaundryDto extends PartialType(CreateLaundryDto) {

    @IsOptional()
    weight?: number | undefined;

    @IsOptional()
    price?: number | undefined;

    @IsOptional()
    status?: string | undefined;

}
