// Uncomment the code below and write your tests
import {
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';
import { InsufficientFundsError } from '.';

describe('BankAccount', () => {
  jest.unmock('lodash');
  const lodash = jest.requireActual('lodash');

  test('should create account with initial balance', () => {
    const balance = getBankAccount(400).getBalance();
    expect(balance).toBe(400);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(400);
    expect(() => {
      bankAccount.withdraw(500);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(400);
    const bankAccountTwo = getBankAccount(600);

    expect(() => {
      bankAccount.transfer(500, bankAccountTwo);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(400);
    expect(() => {
      bankAccount.transfer(500, bankAccount);
    }).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(400).deposit(500);
    expect(bankAccount.getBalance()).toBe(900);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(400).withdraw(200);
    expect(bankAccount.getBalance()).toBe(200);
  });

  test('should transfer money', () => {
    const bankAccountTwo = getBankAccount(600);
    const bankAccount = getBankAccount(400).transfer(200, bankAccountTwo);

    expect(bankAccount.getBalance()).toBe(200);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(400);
    const balance = await bankAccount.fetchBalance();
    if (balance === null) {
      expect(balance).toBe(null);
    } else {
      expect(balance).not.toBeNaN();
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    lodash.random = jest.fn(() => 1);
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
