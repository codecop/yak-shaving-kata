import { calculatePrice, getOrderLabel, getOrderPriority, OrderType } from '../src/orderPricing';

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

  it('applies 30% discount for small wholesale orders', () => {
    expect(calculatePrice('wholesale', 40)).toBe(28);
  });

  describe('edge cases', () => {
    it('handles zero base price for standard orders', () => {
      expect(calculatePrice('standard', 0)).toBe(0);
    });

    it('handles zero base price for premium orders', () => {
      expect(calculatePrice('premium', 0)).toBe(0);
    });

    it('handles zero base price for wholesale orders', () => {
      expect(calculatePrice('wholesale', 0)).toBe(0);
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

    it('handles negative base price for wholesale orders', () => {
      expect(calculatePrice('wholesale', -100)).toBe(-70);
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

    it('handles very small fractional base prices for wholesale orders', () => {
      expect(calculatePrice('wholesale', 0.001)).toBeCloseTo(0.0007);
    });

    it('handles very small fractional base prices for subscription orders', () => {
      expect(calculatePrice('subscription', 0.001)).toBeCloseTo(0.00085);
    });
  });
});

describe('getOrderLabel', () => {
  it('returns correct label for each type', () => {
    expect(getOrderLabel('standard')).toBe('Standard Order');
    expect(getOrderLabel('premium')).toBe('Premium Order');
    expect(getOrderLabel('wholesale')).toBe('Wholesale Order');
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
