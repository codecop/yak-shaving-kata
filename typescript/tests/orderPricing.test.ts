import { calculatePrice, getOrderLabel, getOrderPriority, OrderType } from '../src/orderPricing';
import { OrderFactory, StandardOrder, PremiumOrder, WholesaleOrder, SubscriptionOrder } from '../src/orderTypes';

describe('calculatePrice', () => {
  it('returns base price for standard orders', () => {
    expect(calculatePrice('standard', 100)).toBe(100);
  });

  it('applies 20% markup for premium orders', () => {
    expect(calculatePrice('premium', 100)).toBe(120);
  });

  it('applies 30% discount for wholesale orders', () => {
    expect(calculatePrice('wholesale', 200)).toBe(140);
  });

  it('applies 15% discount for subscription orders', () => {
    expect(calculatePrice('subscription', 100)).toBe(85);
  });

    it('applies 30% discount for wholesale orders', () => {
      expect(calculatePrice('wholesale', 100)).toBe(70);
    });

    it('throws error for wholesale orders below $50 minimum', () => {
      expect(() => calculatePrice('wholesale', 49)).toThrow('Wholesale orders require a minimum base price of $50. Got: $49');
    });

    it('allows wholesale orders at exactly $50 minimum', () => {
      expect(calculatePrice('wholesale', 50)).toBe(35);
    });

    it('allows wholesale orders above $50 minimum', () => {
      expect(calculatePrice('wholesale', 51)).toBeCloseTo(35.7);
    });

  describe('edge cases', () => {
    it('handles zero base price for standard orders', () => {
      expect(calculatePrice('standard', 0)).toBe(0);
    });

    it('handles zero base price for premium orders', () => {
      expect(calculatePrice('premium', 0)).toBe(0);
    });

    it('throws error for zero base price wholesale orders', () => {
      expect(() => calculatePrice('wholesale', 0)).toThrow('Wholesale orders require a minimum base price of $50. Got: $0');
    });

    it('handles zero base price for subscription orders', () => {
      expect(calculatePrice('subscription', 0)).toBe(0);
    });

    it('handles negative base price for standard orders', () => {
      expect(calculatePrice('standard', -100)).toBe(-100);
    });

    it('handles negative base price for premium orders', () => {
      expect(calculatePrice('premium', -100)).toBe(-120);
    });

    it('throws error for negative base price wholesale orders', () => {
      expect(() => calculatePrice('wholesale', -100)).toThrow('Wholesale orders require a minimum base price of $50. Got: $-100');
    });

    it('handles negative base price for subscription orders', () => {
      expect(calculatePrice('subscription', -100)).toBe(-85);
    });

    it('handles very large base price for standard orders', () => {
      expect(calculatePrice('standard', 1000000)).toBe(1000000);
    });

    it('handles very large base price for premium orders', () => {
      expect(calculatePrice('premium', 1000000)).toBe(1200000);
    });

    it('handles very large base price for wholesale orders', () => {
      expect(calculatePrice('wholesale', 1000000)).toBe(700000);
    });

    it('handles very large base price for subscription orders', () => {
      expect(calculatePrice('subscription', 1000000)).toBe(850000);
    });

    it('handles fractional base prices for standard orders', () => {
      expect(calculatePrice('standard', 99.99)).toBe(99.99);
    });

    it('handles fractional base prices for premium orders', () => {
      expect(calculatePrice('premium', 99.99)).toBeCloseTo(119.988);
    });

    it('handles fractional base prices for wholesale orders', () => {
      expect(calculatePrice('wholesale', 99.99)).toBeCloseTo(69.993);
    });

    it('handles fractional base prices for subscription orders', () => {
      expect(calculatePrice('subscription', 99.99)).toBeCloseTo(84.9915);
    });

    it('handles very small fractional base prices for standard orders', () => {
      expect(calculatePrice('standard', 0.001)).toBe(0.001);
    });

    it('handles very small fractional base prices for premium orders', () => {
      expect(calculatePrice('premium', 0.001)).toBeCloseTo(0.0012);
    });

    it('throws error for very small fractional base prices for wholesale orders', () => {
      expect(() => calculatePrice('wholesale', 0.001)).toThrow('Wholesale orders require a minimum base price of $50. Got: $0.001');
    });

    it('handles very small fractional base prices for subscription orders', () => {
      expect(calculatePrice('subscription', 0.001)).toBeCloseTo(0.00085);
    });
  });
});

describe('invalid order types', () => {
  it('throws error for invalid order type', () => {
    expect(() => calculatePrice('invalid' as any, 100)).toThrow();
  });

  it('throws error with descriptive message for invalid order type', () => {
    expect(() => calculatePrice('invalid' as any, 100)).toThrow('Invalid order type: \'invalid\'. Valid types are: standard, premium, wholesale, subscription');
  });

  it('throws error for empty string order type', () => {
    expect(() => calculatePrice('' as any, 100)).toThrow();
  });

  it('throws error for null order type', () => {
    expect(() => calculatePrice(null as any, 100)).toThrow();
  });

  it('throws error for undefined order type', () => {
    expect(() => calculatePrice(undefined as any, 100)).toThrow();
  });

  it('throws error for numeric order type', () => {
    expect(() => calculatePrice(123 as any, 100)).toThrow();
  });

  it('throws error for object order type', () => {
    expect(() => calculatePrice({} as any, 100)).toThrow();
  });
});

describe('getOrderLabel', () => {
  it('returns correct label for each type', () => {
    expect(getOrderLabel('standard')).toBe('Standard Order');
    expect(getOrderLabel('premium')).toBe('Premium Order');
    expect(getOrderLabel('wholesale')).toBe('Wholesale Order');
    expect(getOrderLabel('subscription')).toBe('Subscription Order');
  });

  describe('edge cases', () => {
    it('returns correct label for subscription order type', () => {
      expect(getOrderLabel('subscription')).toBe('Subscription Order');
    });

    it('handles all order types consistently', () => {
      const orderTypes: Array<OrderType> = ['standard', 'premium', 'wholesale', 'subscription'];
      const expectedLabels = [
        'Standard Order',
        'Premium Order',
        'Wholesale Order',
        'Subscription Order'
      ];

      orderTypes.forEach((type, index) => {
        expect(getOrderLabel(type)).toBe(expectedLabels[index]);
      });
    });
  });
});

describe('getOrderPriority', () => {
  it('returns correct priority for each type', () => {
    expect(getOrderPriority('standard')).toBe(1);
    expect(getOrderPriority('premium')).toBe(3);
    expect(getOrderPriority('wholesale')).toBe(2);
    expect(getOrderPriority('subscription')).toBe(4);
  });

  describe('edge cases', () => {
    it('returns correct priority for subscription order type', () => {
      expect(getOrderPriority('subscription')).toBe(4);
    });

    it('handles all order types consistently', () => {
      const orderTypes: Array<OrderType> = ['standard', 'premium', 'wholesale', 'subscription'];
      const expectedPriorities = [1, 3, 2, 4];

      orderTypes.forEach((type, index) => {
        expect(getOrderPriority(type)).toBe(expectedPriorities[index]);
      });
    });

    it('maintains consistent priority ordering', () => {
      const priorities = [
        getOrderPriority('standard'),
        getOrderPriority('wholesale'),
        getOrderPriority('premium'),
        getOrderPriority('subscription')
      ];

      // Priorities should be in ascending order: 1, 2, 3, 4
      expect(priorities).toEqual([1, 2, 3, 4]);
    });
  });
});

describe('OrderFactory', () => {
  it('creates StandardOrder instance for standard type', () => {
    const order = OrderFactory.createOrder('standard');
    expect(order).toBeInstanceOf(StandardOrder);
  });

  it('creates PremiumOrder instance for premium type', () => {
    const order = OrderFactory.createOrder('premium');
    expect(order).toBeInstanceOf(PremiumOrder);
  });

  it('creates WholesaleOrder instance for wholesale type', () => {
    const order = OrderFactory.createOrder('wholesale');
    expect(order).toBeInstanceOf(WholesaleOrder);
  });

  it('creates SubscriptionOrder instance for subscription type', () => {
    const order = OrderFactory.createOrder('subscription');
    expect(order).toBeInstanceOf(SubscriptionOrder);
  });

  it('throws error for invalid order type', () => {
    expect(() => OrderFactory.createOrder('invalid' as any)).toThrow('Invalid order type: \'invalid\'. Valid types are: standard, premium, wholesale, subscription');
  });

  it('throws error for empty string order type', () => {
    expect(() => OrderFactory.createOrder('')).toThrow('Invalid order type: \'\'. Valid types are: standard, premium, wholesale, subscription');
  });
});

describe('StandardOrder class', () => {
  let standardOrder: StandardOrder;

  beforeEach(() => {
    standardOrder = new StandardOrder();
  });

  it('calculates price correctly', () => {
    expect(standardOrder.calculatePrice(100)).toBe(100);
    expect(standardOrder.calculatePrice(50)).toBe(50);
    expect(standardOrder.calculatePrice(0)).toBe(0);
  });

  it('returns correct label', () => {
    expect(standardOrder.getLabel()).toBe('Standard Order');
  });

  it('returns correct priority', () => {
    expect(standardOrder.getPriority()).toBe(1);
  });

  it('validate method does not throw for any base price', () => {
    expect(() => standardOrder.validate(100)).not.toThrow();
    expect(() => standardOrder.validate(0)).not.toThrow();
    expect(() => standardOrder.validate(-100)).not.toThrow();
  });
});

describe('PremiumOrder class', () => {
  let premiumOrder: PremiumOrder;

  beforeEach(() => {
    premiumOrder = new PremiumOrder();
  });

  it('calculates price with 20% markup', () => {
    expect(premiumOrder.calculatePrice(100)).toBe(120);
    expect(premiumOrder.calculatePrice(50)).toBe(60);
    expect(premiumOrder.calculatePrice(0)).toBe(0);
  });

  it('returns correct label', () => {
    expect(premiumOrder.getLabel()).toBe('Premium Order');
  });

  it('returns correct priority', () => {
    expect(premiumOrder.getPriority()).toBe(3);
  });

  it('validate method does not throw for any base price', () => {
    expect(() => premiumOrder.validate(100)).not.toThrow();
    expect(() => premiumOrder.validate(0)).not.toThrow();
    expect(() => premiumOrder.validate(-100)).not.toThrow();
  });
});

describe('WholesaleOrder class', () => {
  let wholesaleOrder: WholesaleOrder;

  beforeEach(() => {
    wholesaleOrder = new WholesaleOrder();
  });

  it('calculates price with 30% discount', () => {
    expect(wholesaleOrder.calculatePrice(100)).toBe(70);
    expect(wholesaleOrder.calculatePrice(200)).toBe(140);
  });

  it('returns correct label', () => {
    expect(wholesaleOrder.getLabel()).toBe('Wholesale Order');
  });

  it('returns correct priority', () => {
    expect(wholesaleOrder.getPriority()).toBe(2);
  });

  it('validate method throws for base price below $50', () => {
    expect(() => wholesaleOrder.validate(49)).toThrow('Wholesale orders require a minimum base price of $50. Got: $49');
    expect(() => wholesaleOrder.validate(0)).toThrow('Wholesale orders require a minimum base price of $50. Got: $0');
    expect(() => wholesaleOrder.validate(-100)).toThrow('Wholesale orders require a minimum base price of $50. Got: $-100');
  });

  it('validate method does not throw for base price at or above $50', () => {
    expect(() => wholesaleOrder.validate(50)).not.toThrow();
    expect(() => wholesaleOrder.validate(51)).not.toThrow();
    expect(() => wholesaleOrder.validate(100)).not.toThrow();
  });
});

describe('SubscriptionOrder class', () => {
  let subscriptionOrder: SubscriptionOrder;

  beforeEach(() => {
    subscriptionOrder = new SubscriptionOrder();
  });

  it('calculates price with 15% discount', () => {
    expect(subscriptionOrder.calculatePrice(100)).toBe(85);
    expect(subscriptionOrder.calculatePrice(200)).toBe(170);
  });

  it('returns correct label', () => {
    expect(subscriptionOrder.getLabel()).toBe('Subscription Order');
  });

  it('returns correct priority', () => {
    expect(subscriptionOrder.getPriority()).toBe(4);
  });

  it('validate method does not throw for any base price', () => {
    expect(() => subscriptionOrder.validate(100)).not.toThrow();
    expect(() => subscriptionOrder.validate(0)).not.toThrow();
    expect(() => subscriptionOrder.validate(-100)).not.toThrow();
  });
});
