import { OrderFactory } from './orderTypes'

export type OrderType = 'standard' | 'premium' | 'wholesale' | 'subscription';

export function calculatePrice(orderType: OrderType, basePrice: number): number {
  const order = OrderFactory.createOrder(orderType)
  order.validate(basePrice)
  return order.calculatePrice(basePrice)
}

export function getOrderLabel(orderType: OrderType): string {
  const order = OrderFactory.createOrder(orderType)
  return order.getLabel()
}

export function getOrderPriority(orderType: OrderType): number {
  const order = OrderFactory.createOrder(orderType)
  return order.getPriority()
}
