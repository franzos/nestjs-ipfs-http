# IPFS HTTP module for Nest framework (Nestjs)

This package provides `ipfs-http-client` as a NestJS Module.

The client is currently locked at `"ipfs-http-client": "^52.0.5"` for Node.js v14 support.

## Installation

```bash
npm install nestjs-ipfs-http
```

## Usage

This module expects a running IPFS daemon.

```bash
ipfs daemon
```

### Import

```js
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
```

For all client options refer to [ipfs-http-client#createoptions](https://www.npmjs.com/package/ipfs-http-client#createoptions)

### Use

```js
const isOnline = await ipfsHttpService.client.isOnline()
console.log(isOnline) // true
```
