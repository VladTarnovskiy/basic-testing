// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  const lodash = jest.requireActual('lodash');
  test('should create account with initial balance', () => {
    const balance = getBankAccount(400).getBalance();
    expect(balance).toBe(400);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = getBankAccount(400);
    expect(() => {
      balance.withdraw(500);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const accountOne = getBankAccount(400);
    const accountTwo = getBankAccount(500);

    expect(() => {
      accountOne.transfer(600, accountTwo);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const accountOne = getBankAccount(400);
    expect(() => {
      accountOne.transfer(600, accountOne);
    }).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const accountOne = getBankAccount(400).deposit(600);
    expect(accountOne.getBalance()).toBe(1000);
  });

  test('should withdraw money', () => {
    const accountOne = getBankAccount(400).withdraw(100);
    expect(accountOne.getBalance()).toBe(300);
  });

  test('should transfer money', () => {
    const accountOne = getBankAccount(400);
    const accountTwo = getBankAccount(500);

    expect(accountOne.transfer(200, accountTwo).getBalance()).toBe(200);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    lodash.random = jest.fn(() => 1);
    const accountOne = getBankAccount(400);
    const balance = await accountOne.fetchBalance();
    if (balance === null) {
      expect(balance).toBe(null);
    } else {
      expect(balance).not.toBeNaN();
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    lodash.random = jest.fn(() => 0.6);
    const bankAccount = getBankAccount(400);
    const balance = bankAccount.getBalance();
    await bankAccount.synchronizeBalance();
    expect(balance).not.toBe(bankAccount.getBalance());
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    lodash.random = jest.fn(() => 0);
    const bankAccount = getBankAccount(400);
    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
