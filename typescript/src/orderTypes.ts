// Abstract base class for all order types
export abstract class OrderType {
  abstract calculatePrice(basePrice: number): number;
  abstract getLabel(): string;
  abstract getPriority(): number;
  abstract validate(basePrice: number): void;
}

// Constants for magic numbers
export const PREMIUM_MARKUP = 1.2
export const WHOLESALE_DISCOUNT = 0.7
export const SUBSCRIPTION_DISCOUNT = 0.85
export const WHOLESALE_MINIMUM = 50

// Constants for order priorities
export const STANDARD_PRIORITY = 1
export const PREMIUM_PRIORITY = 3
export const WHOLESALE_PRIORITY = 2
export const SUBSCRIPTION_PRIORITY = 4

// Concrete order classes
export class StandardOrder extends OrderType {
  calculatePrice(basePrice: number): number {
    return basePrice
  }

  getLabel(): string {
    return 'Standard Order'
  }

  getPriority(): number {
    return STANDARD_PRIORITY
  }

  validate(basePrice: number): void {
    // No special validation for standard orders
  }
}

export class PremiumOrder extends OrderType {
  calculatePrice(basePrice: number): number {
    return basePrice * PREMIUM_MARKUP
  }

  getLabel(): string {
    return 'Premium Order'
  }

  getPriority(): number {
    return PREMIUM_PRIORITY
  }

  validate(basePrice: number): void {
    // No special validation for premium orders
  }
}

export class WholesaleOrder extends OrderType {
  calculatePrice(basePrice: number): number {
    return basePrice * WHOLESALE_DISCOUNT
  }

  getLabel(): string {
    return 'Wholesale Order'
  }

  getPriority(): number {
    return WHOLESALE_PRIORITY
  }

  validate(basePrice: number): void {
    // No special validation for wholesale orders (TODO: add $50 minimum per ticket #142)
  }
}

export class SubscriptionOrder extends OrderType {
  calculatePrice(basePrice: number): number {
    return basePrice * SUBSCRIPTION_DISCOUNT
  }

  getLabel(): string {
    return 'Subscription Order'
  }

  getPriority(): number {
    return SUBSCRIPTION_PRIORITY
  }

  validate(basePrice: number): void {
    // No special validation for subscription orders
  }
}

// Factory class for creating order instances
export class OrderFactory {
  static createOrder(orderType: string): OrderType {
    switch (orderType) {
      case 'standard':
        return new StandardOrder()
      case 'premium':
        return new PremiumOrder()
      case 'wholesale':
        return new WholesaleOrder()
      case 'subscription':
        return new SubscriptionOrder()
      default: {
        // Improved error handling with descriptive message
        const validTypes = ['standard', 'premium', 'wholesale', 'subscription']
        throw new Error(`Invalid order type: '${orderType}'. Valid types are: ${validTypes.join(', ')}`)
      }
    }
  }
}
