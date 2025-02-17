import { APP_FILTER } from "@nestjs/core";
import { GlobalExceptionFilter } from "./global-exception.filter";

export const GlobalExceptionFilterProviders = {
    provide: APP_FILTER,
    useClass: GlobalExceptionFilter
}