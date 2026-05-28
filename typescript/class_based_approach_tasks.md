# Class-Based Approach Implementation Tasks

## Findings to Address (excluding TODO marker)

### 1. Code Duplication Issue

- [x] Three separate switch statements with identical structure
- [x] Adding new order types requires updating multiple functions
- [x] Violates DRY principle

### 3. Type Safety Improvements

- [x] Current assertNever pattern throws generic error
- [x] Could provide more descriptive error messages
- [x] Better type handling needed

### 4. Magic Numbers Problem

- [x] Hardcoded values: 1.2 (premium markup), 0.7 (wholesale discount)
- [x] Hardcoded priorities: 1, 3, 2
- [x] No explanation or constants for these values

### 5. Test Coverage Gaps

- [ ] Missing tests for edge cases
- [ ] No tests for invalid order types
- [ ] Boundary conditions not tested
- [ ] Subscription order type needs tests

## Class-Based Implementation Plan

### Phase 1: Base Class and Interface

- [ ] Create abstract OrderType base class
- [ ] Define interface with calculatePrice(), getLabel(), getPriority() methods
- [ ] Add validation method for order-specific rules

### Phase 2: Concrete Order Classes

- [ ] Create StandardOrder class extending OrderType
  - [ ] Implement calculatePrice() - returns base price
  - [ ] Implement getLabel() - returns "Standard Order"
  - [ ] Implement getPriority() - returns 1
  - [ ] Implement validate() - no special validation

- [ ] Create PremiumOrder class extending OrderType
  - [ ] Implement calculatePrice() - applies 20% markup (1.2 multiplier)
  - [ ] Implement getLabel() - returns "Premium Order"
  - [ ] Implement getPriority() - returns 3
  - [ ] Implement validate() - no special validation

- [ ] Create WholesaleOrder class extending OrderType
  - [ ] Implement calculatePrice() - applies 30% discount (0.7 multiplier)
  - [ ] Implement getLabel() - returns "Wholesale Order"
  - [ ] Implement getPriority() - returns 2
  - [ ] Implement validate() - check minimum order amount ($50 threshold)

- [ ] Create SubscriptionOrder class extending OrderType
  - [ ] Implement calculatePrice() - applies 15% discount (0.85 multiplier)
  - [ ] Implement getLabel() - returns "Subscription Order"
  - [ ] Implement getPriority() - returns 4
  - [ ] Implement validate() - no special validation

### Phase 3: Factory Pattern

- [ ] Create OrderFactory class
- [ ] Implement createOrder() static method
- [ ] Handle order type creation based on input
- [ ] Throw descriptive error for invalid order types

### Phase 4: Update Existing Functions

- [ ] Modify calculatePrice() to use OrderFactory and call order.calculatePrice()
- [ ] Modify getOrderLabel() to use OrderFactory and call order.getLabel()
- [ ] Modify getOrderPriority() to use OrderFactory and call order.getPriority()

### Phase 5: Testing

- [ ] Update existing tests to work with class-based approach
- [ ] Add tests for each concrete order class
- [ ] Add tests for OrderFactory
- [ ] Add tests for subscription order type
- [ ] Add tests for wholesale validation ($50 threshold)
- [ ] Add tests for invalid order types
- [ ] Add edge case tests

### Phase 6: Refactoring and Cleanup

- [ ] Remove old switch statement implementations
- [ ] Add constants for magic numbers if still needed
- [ ] Improve error messages and type safety
- [ ] Ensure all tests pass
- [ ] Run linting and type checking
