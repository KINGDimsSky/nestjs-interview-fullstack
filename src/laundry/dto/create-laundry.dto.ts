import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateLaundryDto {
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    customerId : number
   
    @IsNumber()
    @IsNotEmpty()
    @Min(0.1)
    @Type(() => Number) 
    weight : number

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Type(() => Number)
    price : number

    @IsNotEmpty()
    @IsString()
    status : string

}
