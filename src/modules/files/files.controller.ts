import path from 'path';
import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesService } from './files.service';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import { ConfigService } from '@nestjs/config';


export const storage = {
    storage: diskStorage({
        destination: './public/',
        filename: (req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, '');
            const extension: string = path.parse(file.originalname).ext;
            cb(null, `${filename}${extension}`)
        }
    })
}

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService, private readonly configService: ConfigService,) { }

    @ApiTags('Admin')
    @ApiBearerAuth('defaultBearerAuth')
    @UseGuards(JwtAuthenticationGuard)
    @Post('/upload')
    @UseInterceptors(FileInterceptor('file', storage))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        const domain = this.configService.get('DOMAIN')
        return { url: `${domain}/${file.filename}` }
    }
}