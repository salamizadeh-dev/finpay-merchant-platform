import { Link } from 'react-router';

import { buildRoute } from '../../../app/router/routes';

import type { PaymentTransaction } from '../../../domain/payments/payment.types';

import { formatUsdMinor } from '../utils/formatUsdMinor';

import styles from './DashboardPanels.module.css';

interface RecentTransactionsProps {
  transactions: PaymentTransaction[];
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  timeZone: 'UTC',
});

export function RecentTransactions({
  transactions,
}: RecentTransactionsProps) {
  return (
    <section
      className={styles.panel}
      aria-labelledby="recent-transactions-title"
    >
      <h2 id="recent-transactions-title">
        Recent Transactions
      </h2>

      {transactions.length === 0 ? (
        <p>No recent transactions.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Transaction</th>
                <th scope="col">Date (UTC)</th>
                <th scope="col">Status</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>
                    <Link
                      to={buildRoute.transactionDetails(
                        transaction.id,
                      )}
                    >
                      {transaction.id}
                    </Link>
                  </td>

                  <td>
                    {dateFormatter.format(
                      new Date(transaction.createdAt),
                    )}
                  </td>

                  <td>{transaction.status}</td>

                  <td>
                    {formatUsdMinor(transaction.amountMinor)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}