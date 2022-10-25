import { createConfigurableDynamicRootModule } from '@golevelup/nestjs-modules'
import { Logger, Module } from '@nestjs/common'
import { CLIENT_OPTIONS, IPFS_HTTP_MODULE_OPTIONS } from './constants'
import { IpfsHttpModuleOptions } from './ipfs-http.interface'
import { IpfsHttpService } from './ipfs-http.service'

@Module({
    providers: [IpfsHttpService],
    exports: [IpfsHttpModule, IpfsHttpService],
})
export class IpfsHttpModule extends createConfigurableDynamicRootModule<IpfsHttpModule, IpfsHttpModuleOptions>(
    IPFS_HTTP_MODULE_OPTIONS,
    {
        providers: [
            {
                provide: CLIENT_OPTIONS,
                inject: [IPFS_HTTP_MODULE_OPTIONS],
                useFactory: (options: IpfsHttpModuleOptions) => options.client,
            },
        ],
        exports: [CLIENT_OPTIONS, IpfsHttpService],
    },
) {
    private readonly logger = new Logger(IpfsHttpModule.name)
    constructor(private readonly service: IpfsHttpService) {
        super()
    }

    async onModuleInit() {
        const isOnline = await this.service.client.isOnline()
        this.logger.log(`IPFS Http Client is online: ${isOnline}.`)
    }
}
