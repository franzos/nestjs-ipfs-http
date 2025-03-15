import { Module, Logger, OnModuleInit } from '@nestjs/common'
import { IpfsHttpService } from './ipfs-http.service'
import { ConfigurableModuleClass } from './ipfs-http.module-definitions'

@Module({
    providers: [IpfsHttpService],
    exports: [IpfsHttpService],
})
export class IpfsHttpModule extends ConfigurableModuleClass implements OnModuleInit {
    private readonly logger = new Logger(IpfsHttpModule.name)

    constructor(private readonly service: IpfsHttpService) {
        super()
    }

    async onModuleInit() {
        const isOnline = await this.service.client.isOnline()
        this.logger.log(`IPFS Http Client is online: ${isOnline}.`)
    }
}