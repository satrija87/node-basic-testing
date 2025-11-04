// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  BankAccount,
  SynchronizationFailedError,
} from '.';
import lodash from 'lodash';

const myBalance = 1000;
let amount = 2000;
let myAccount: BankAccount;

beforeEach(() => {
  myAccount = getBankAccount(myBalance);
});
// const anotherAccount = getBankAccount(anotherBalance);
describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(myAccount.getBalance()).toBe(myBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => myAccount.withdraw(amount)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    let moreMoney = 3000;
    expect(() => myAccount.transfer(moreMoney, myAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => myAccount.transfer(amount, myAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    myAccount.deposit(amount);
    expect(myAccount.getBalance()).toBe(3000);
  });

  test('should withdraw money', () => {
    myAccount.withdraw(500);
    expect(myAccount.getBalance()).toBe(500);
  });

  test('should transfer money', () => {
    let anontherAccount = getBankAccount(500);
    myAccount.transfer(500, anontherAccount);
    expect(myAccount.getBalance()).toBe(500);
    expect(anontherAccount.getBalance()).toBe(1000);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const spy = jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(300)
      .mockReturnValueOnce(1);
    const res = await myAccount.fetchBalance();
    expect(res).toBe(300);
    spy.mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const spy = jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(2000)
      .mockReturnValueOnce(1);

    await myAccount.synchronizeBalance();
    expect(myAccount.getBalance()).toBe(2000);
    spy.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const spy = jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(2000)
      .mockReturnValueOnce(0);
    await expect(myAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
    spy.mockRestore();
  });
});
