const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function formatUsdMinor(amountMinor: number): string {
  return usdFormatter.format(amountMinor / 100);
}