import { Module } from '@nestjs/common'
import { IpfsHttpModule } from '../../src/ipfs-http.module'

@Module({
    imports: [
        IpfsHttpModule.forRootAsync(IpfsHttpModule, {
            useFactory: () => {
                return {
                    client: {
                        host: '127.0.0.1',
                        port: 5001,
                    },
                }
            },
        }),
    ],
})
export class AppModule {}
