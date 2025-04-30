export const transformStatsStats = (apiResponse: any) => {
  const labels: string[] = [];
  const totalTransactionsCounts: number[] = [];
  const totalSalesCounts: number[] = [];
  const avgSalesPerTransactionCounts: number[] = [];

  apiResponse.forEach((item: any) => {
    labels.push(item.period);
    totalTransactionsCounts.push(Number(item.total_transactions || 0));
    totalSalesCounts.push(Number(item.total_sales || 0));
    avgSalesPerTransactionCounts.push(Number(item.avg_sales_per_transaction || 0));
  });

  return {
    labels,
    datasets: [
      {
        label: 'Total Transactions',
        data: totalTransactionsCounts,
        backgroundColor: '#4CAF50', // Green
        borderColor: '#388E3C',
        borderWidth: 1,
      },
      {
        label: 'Total Sales',
        data: totalSalesCounts,
        backgroundColor: '#FFC107', // Yellow
        borderColor: '#FFA000',
        borderWidth: 1,
      },
      {
        label: 'Average Sales per Transaction',
        data: avgSalesPerTransactionCounts,
        backgroundColor: '#F44336', // Red
        borderColor: '#D32F2F',
        borderWidth: 1,
      },
    ],
  };
};

export const transformProductCountPerBusiness = (apiResponse: any) => {
  const labels: string[] = [];
  const counts: number[] = [];

  apiResponse.forEach((item: any) => {
    labels.push(item.key);
    counts.push(Number(item.value || 0));
  });

  return {
    labels,
    datasets: [
      {
        label: 'Products',
        data: counts,
        backgroundColor: '#000000',
        borderColor: '#000000',
        borderWidth: 1,
      },
    ],
  };
};

export const transformProductCategoryCountPerBusiness = (apiResponse: any) => {
  const labels: string[] = [];
  const counts: number[] = [];

  apiResponse.forEach((item: any) => {
    labels.push(item.key);
    counts.push(Number(item.value || 0));
  });

  return {
    labels,
    datasets: [
      {
        label: 'Product Categories',
        data: counts,
        backgroundColor: '#000000',
        borderColor: '#000000',
        borderWidth: 1,
      },
    ],
  };
};
