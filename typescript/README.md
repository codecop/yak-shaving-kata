# Yak Shaving Kata

A kata for practising yak shaving.

## Constraints

- Use TDD.
- Never mix concerns in the same commit.
- Never reuse the same context for unrelated changes - neither git branches nor agent sessions.
- Shave the yaks in the right order.

## Your task

Add support for a new order type: `subscription`.

A subscription order applies a 15% discount to the base price (e.g. a base price of 33 results in a price of 28.05) and has a priority of 4.

## Getting started

```[bash]
npm install
npm run build
npm test
```
