import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';
import { IsNotEmpty, IsOptional, IsString, } from 'class-validator';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    name : string

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    phone : string

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    address : string
    
}
