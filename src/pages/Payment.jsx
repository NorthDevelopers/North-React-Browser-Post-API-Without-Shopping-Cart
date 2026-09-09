import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Payment() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    let redirected = false;
    let unsubscribe = null;

    const mountCheckout = async () => {
      try {
        if (typeof window.checkout === 'undefined') {
          throw new Error('Embedded Checkout script not loaded.');
        }

        // Retrieve selected product from localStorage
        const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
        if (!selectedProduct) {
          throw new Error('No product selected for purchase.');
        }

        const amount = parseFloat(selectedProduct.price);
        const products = [{
          name: selectedProduct.title,
          price: amount,
          quantity: 1,
          logoUrl: selectedProduct.image
        }];

        const res = await fetch('/api/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: parseFloat(amount.toFixed(2)),
            products: products
          }),
        });

        const text = await res.text();
        let data = {};
        try {
          data = JSON.parse(text);
        } catch (e) {
          throw new Error(text || `Server returned error status ${res.status}`);
        }

        if (!res.ok) {
          throw new Error(data.error || 'Failed to create session');
        }

        const sessionToken = data.token;
        if (!sessionToken) {
          throw new Error('No session token returned.');
        }

        // Subscribe to payment completion with proper cleanup of the returned unsubscribe function
        unsubscribe = window.checkout.onPaymentComplete((paymentData) => {
          if (redirected) return;
          redirected = true;
          sessionStorage.setItem("north_session_token", sessionToken);
          if (paymentData) {
            sessionStorage.setItem("north_client_response", JSON.stringify(paymentData));
          }
          setTimeout(() => {
            navigate('/payment/result');
          }, 2000);
        });

        await window.checkout.mount(sessionToken, 'checkout-container');

      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    mountCheckout();

    // Cleanup subscription on unmount to prevent memory leaks and duplicate handlers
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [navigate]);

  return (
    <div className='mt-4'>
      <h3 className='text-center'>Secure Checkout</h3>
      {error && <p className="text-danger text-center">{error}</p>}
      <div id="checkout-container" style={{ minHeight: '800px', height: '1000px', margin: '0 auto' }}></div>
    </div>
  );
}

export default Payment;
