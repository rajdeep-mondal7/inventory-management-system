import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BUSINESS_PROFILE } from '../config/business';
import { formatINR, formatDateTime } from '../utils/format';

const PAYMENT_LABELS = { cash: 'Cash', upi: 'UPI', card: 'Card' };

// Rendered outside #root so the print stylesheet can show only the bill.
// All content goes through React children — customer text can never inject markup.
export default function PrintBill({ sale }) {
  useEffect(() => {
    document.body.classList.toggle('printing-bill', Boolean(sale));
    return () => document.body.classList.remove('printing-bill');
  }, [sale]);

  if (!sale) return null;
  const subtotal = (sale.items || []).reduce((s, i) => s + i.subtotal, 0);
  const customer = sale.customer || {};

  return createPortal(
    <div className="print-root">
      <header className="bill-head">
        <h1>{BUSINESS_PROFILE.name}</h1>
        <p>{BUSINESS_PROFILE.address}</p>
        <p>{BUSINESS_PROFILE.phone}</p>
      </header>

      <div className="bill-meta">
        <p><strong>Invoice:</strong> {sale.invoiceNumber}</p>
        <p><strong>Date:</strong> {formatDateTime(sale.createdAt)}</p>
        <p><strong>Sold by:</strong> {sale.soldBy || '—'}</p>
      </div>

      <section className="bill-to">
        <h2>Billed to</h2>
        <p>{customer.name || 'Walk-in customer'}</p>
        {customer.phone && <p>{customer.phone}</p>}
        {customer.email && <p>{customer.email}</p>}
        {customer.address && <p>{customer.address}</p>}
      </section>

      <table className="bill-items">
        <thead>
          <tr><th>Product</th><th className="num">Qty</th><th className="num">Unit price</th><th className="num">Line total</th></tr>
        </thead>
        <tbody>
          {(sale.items || []).map((i) => (
            <tr key={i.product}>
              <td>{i.name}</td>
              <td className="num">{i.quantity}</td>
              <td className="num">{formatINR(i.unitPrice)}</td>
              <td className="num">{formatINR(i.subtotal)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bill-totals">
        <p><span>Subtotal</span><span className="num">{formatINR(subtotal)}</span></p>
        {sale.discount > 0 && <p><span>Discount</span><span className="num">−{formatINR(sale.discount)}</span></p>}
        <p className="bill-grand"><span>Total</span><span className="num">{formatINR(sale.totalAmount)}</span></p>
        <p><span>Payment method</span><span>{PAYMENT_LABELS[sale.paymentMethod] || sale.paymentMethod}</span></p>
      </div>

      <footer className="bill-thanks">Thank you for your business!</footer>
    </div>,
    document.body
  );
}