export async function initiatePayment(checkoutUrl: string): Promise<{ status: string; data: any }> {
  const payment = await new Promise<{ status: string; data: any }>((resolve) => {
    window.LemonSqueezy.Url.Open(checkoutUrl);

    window.LemonSqueezy.Setup({
      eventHandler: (event: any) => {
        if (event.event === 'Checkout.Success') {
          window.LemonSqueezy.Url.Close();
          resolve({ status: 'success', data: event.data.order.data });
        }

        if (event === 'close') {
          console.log("closed")
          resolve({ status: 'closed', data: null });
        }
      },
    });
  });

  return payment;
}