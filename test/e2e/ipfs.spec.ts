import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { IpfsHttpService } from '../../src/ipfs-http.service'
import { AppModule } from '../src/app.module'

describe('General tests', () => {
    let app: INestApplication

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = module.createNestApplication()
        await app.init()
    })
    it('Should appear as online', async () => {
        const ipfsHttpService = app.get(IpfsHttpService)
        console.log(ipfsHttpService)
        const isOnline = ipfsHttpService.client.isOnline()
        expect(isOnline).toBe(true)
    })
})
