# IPFS HTTP module for Nest framework (NestJS)

This package provides a IPFS client as a NestJS Module.

Because the previous IPFS HTTP module has been depreciated, and the replacement `kubo-rpc-client` is utter madness to work with in CommonJS (`kubo-rpc-client` is a ESM library, which relies on `ipfs-utils` which is a CommonJS library), I decided to manually implement the important endpoints.

Here's what's supported:
- add
- get
- cat
- stats/dht

## Installation

- `v0.2.0` is using NestJS 9 for legacy reasons.

```bash
pnpm install nestjs-ipfs-http
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
        IpfsHttpModule.registerAsync({
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

### Use

```js
const isOnline = await ipfsHttpService.client.isOnline()
console.log(isOnline) // true
```

Refer to `test/e2e/ipfs.spec.ts` for more examples.

## Test

```bash
pnpm run test
```