export type OrderType = 'standard' | 'premium' | 'wholesale';

function assertNever(x: never): never {
  throw new Error('Unhandled order type: ' + x)
}

export function calculatePrice(orderType: OrderType, basePrice: number): number {
  switch (orderType) {
    case 'standard':
      return basePrice
    case 'premium':
      return basePrice * 1.2
    case 'wholesale':
      // TODO: no discount should apply for orders under $50, see ticket #142
      return basePrice * 0.7
    default:
      return assertNever(orderType)
  }
}

export function getOrderLabel(orderType: OrderType): string {
  switch (orderType) {
    case 'standard':
      return 'Standard Order'
    case 'premium':
      return 'Premium Order'
    case 'wholesale':
      return 'Wholesale Order'
    default:
      return assertNever(orderType)
  }
}

export function getOrderPriority(orderType: OrderType): number {
  switch (orderType) {
    case 'standard':
      return 1
    case 'premium':
      return 3
    case 'wholesale':
      return 2
    default:
      return assertNever(orderType)
  }
}
