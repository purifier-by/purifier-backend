import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const substringDomain = (str: string) => {
    const domain = configService.get('DOMAIN')

    return str.replace(`${domain}/`, '')
}