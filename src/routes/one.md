# This is an example inspired by [GitHub](https://github.com)

## Another header

- List item
  - Sub list

```typescript
function printImportant(key: LogLevelStrings, message: string) {
 const num = LogLevel[key];
 if (num <= LogLevel.WARN) {
  console.log('Log level key is:', key); // [!code --]
  console.log('Log level value is:', num);
  console.log('Log level message is:', message);
 }
}
```
