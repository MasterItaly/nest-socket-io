# READ ME - Nest with Socket.io

> https://socket.io/

> https://docs.nestjs.com/websockets/gateways

---

## Packages

```shell
npm install @nestjs/platform-socket.io
npm install socket.io
```

### Erros

> Check in this Packages with `npm list --all` the Version of `reflect-metadata`.

```shell
npm install reflect-metadata
```

> Add in the `main.ts` `import 'reflect-metadata';`

---

## Changes in a default Nest-App

### `main.ts`

```typescript
app.useWebSocketAdapter(new IoAdapter(app));
```

https://docs.nestjs.com/security/cors
