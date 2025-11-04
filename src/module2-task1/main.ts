import ledger from "./ledger.json";
import type {
  GeneralLedgerEntry,
  AccountDaily,
  AccountDailyReducer,
} from "./i-faces";

function getDailyTurnover<
  T extends { debitAccountId: string; creditAccountId: string; posted: string }
>(accountId: string, ledger: T[]): AccountDaily[] {
  const debitTotalForAccountId = ledger.filter(
    (item) => item.debitAccountId === accountId
  );

  const creditTotalForAccountId = ledger.filter(
    (item) => item.creditAccountId === accountId
  );

  const currentLedger = [
    ...debitTotalForAccountId,
    ...creditTotalForAccountId,
  ].map((item) => ({
    ...item,
    date: new Date(item.posted).toISOString().split("T")[0] || "",
  }));

  return currentLedger.reduce((acc: AccountDaily[], currentValue) => {
    const currentAccountDaily = acc.find(
      (item) => item.date === currentValue.date
    );
    if (currentAccountDaily) {
      if (currentValue.creditAccountId === accountId) {
        acc.push({
          debitDayTotal: currentAccountDaily.debitDayTotal,
          creditDayTotal: currentAccountDaily.creditDayTotal++,
          date: currentValue.date,
        });
      } else {
        acc.push({
          debitDayTotal: currentAccountDaily.debitDayTotal++,
          creditDayTotal: currentAccountDaily.creditDayTotal,
          date: currentValue.date,
        });
      }
      return acc;
    } else {
      if (currentValue.creditAccountId === accountId) {
        acc.push({
          debitDayTotal: 0,
          creditDayTotal: 1,
          date: currentValue.date,
        });
      } else {
        acc.push({
          debitDayTotal: 1,
          creditDayTotal: 0,
          date: currentValue.date,
        });
      }
      return acc;
    }
  }, []);
}

console.log(getDailyTurnover<GeneralLedgerEntry>("101.0001 cash", ledger));
