const fs = require('fs').promises

import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { IpfsHttpService } from '../../src/ipfs-http.service'
import { AppModule } from '../src/app.module'

describe('General tests', () => {
    let app: INestApplication
    let ipfsHttpService: IpfsHttpService

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = module.createNestApplication()
        await app.init()

        ipfsHttpService = app.get(IpfsHttpService)
    })

    afterEach(async () => {
        await app.close()
    })

    it('Should appear as online', async () => {
        const isOnline = await ipfsHttpService.client.isOnline()
        expect(isOnline).toBe(true)
    })

    it('Should upload file successfully', async () => {
        const data = await fs.readFile('test.txt')
        const file = Buffer.from(data)

        const res = await ipfsHttpService.client.add(file, {})
        expect(res).toBeDefined()
    })

    it('Should (upload &) download file successfully', async () => {
        const data = await fs.readFile('test.txt')
        const file = Buffer.from(data)

        const uploadRes = await ipfsHttpService.client.add(file, {})
        const downloadRes = await ipfsHttpService.client.cat({ arg: uploadRes.Hash })

        const str = new TextDecoder().decode(new Uint8Array(downloadRes))
        expect(str).toBe('Hi there')
    })
})
