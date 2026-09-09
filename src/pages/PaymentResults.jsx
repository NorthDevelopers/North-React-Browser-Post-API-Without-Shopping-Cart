import React, { useState, useEffect } from 'react'

function PaymentResults() {
  const [paymentResult, setPaymentResult] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = sessionStorage.getItem('north_session_token');
    
    if (!token) {
      setError("No session token found. Cannot verify payment.");
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await fetch('/api/complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        });
        
        const contentType = res.headers.get("content-type");
        let data = {};
        if (contentType && contentType.includes("application/json")) {
          data = await res.json();
        } else {
          const text = await res.text();
          throw new Error(text || `Server returned error status ${res.status}`);
        }
        
        if (!res.ok) {
           setError(data.error || 'Failed to verify payment status.');
           return;
        }

        setPaymentResult(data);
        
        // If payment approved (case-insensitive check)
        const status = data.body?.status?.toLowerCase();
        if (data.ok && status === 'approved') {
          const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
          if (selectedProduct) {
            sessionStorage.setItem('amount_paid', selectedProduct.price.toString());
          }
          localStorage.removeItem('selectedProduct')
        }
      } catch (err) {
        console.error(err);
        setError("Error communicating with server.");
      }
    };

    verifyPayment();
  }, []);

  if(error) return <p className="text-danger text-center mt-4">{error}</p>
  if(!paymentResult) return <p className="text-center mt-4">Loading verification...</p>

  const statusStr = paymentResult.body?.status?.toLowerCase();
  const isApproved = paymentResult.ok && statusStr === 'approved';

  const amountPaid = paymentResult.body?.amount 
    || parseFloat(paymentResult.body?.body?.auth_amount) 
    || parseFloat(sessionStorage.getItem('amount_paid'))
    || 0;

  return (
    <div className='w-50 mx-auto border mt-4'>
      {isApproved ? (
        <div className='text-center p-4'>
          <svg xmlns="http://www.w3.org/2000/svg" width='70' fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-2 h-2 text-success mx-auto mb-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
          </svg>

          <p className='fw-bold'>Payment succeeded</p>
          <p>Amount paid: ${amountPaid.toFixed(2)}</p>
        </div>
      ) : (
        <div className='text-center p-4'>
          <svg xmlns="http://www.w3.org/2000/svg" width='70' fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-danger mx-auto mb-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>

          <p className='fw-bold'>Payment failed or pending</p>
          <p>Reason: {paymentResult.body?.message || 'Verification unsuccessful'}</p>
        </div>
      )}
    </div>
  )
}

export default PaymentResults
