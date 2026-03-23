import { PaymentMethod, PaymentStatus, PaymentDetails } from '../types';

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  status: string;
}

export interface PaymentConfig {
  key_id: string;
  amount: number;
  name: string;
  description: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
}

const MOCK_TRANSACTION_ID = () => `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

export const createPaymentOrder = async (
  amount: number,
  workerId: string,
  workerName: string,
  service: string
): Promise<PaymentDetails> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    id: `order_${Date.now()}`,
    amount,
    method: 'upi',
    status: 'pending',
    transaction_id: undefined,
    created_at: new Date(),
    worker_id: workerId,
    worker_name: workerName,
    service,
  };
};

export const processPayment = async (
  paymentDetails: PaymentDetails,
  method: PaymentMethod
): Promise<PaymentDetails> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const success = Math.random() > 0.1;
  
  return {
    ...paymentDetails,
    method,
    status: success ? 'success' : 'failed',
    transaction_id: success ? MOCK_TRANSACTION_ID() : undefined,
  };
};

export const verifyPayment = async (transactionId: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return true;
};

export const getPaymentConfig = (amount: number, name: string, email: string, contact: string): PaymentConfig => {
  return {
    key_id: 'rzp_test_XXXXXXXXXX',
    amount: amount * 100,
    name,
    description: 'HouseBuddy Service Payment',
    prefill: { name, email, contact },
  };
};

export const refundPayment = async (transactionId: string, amount: number): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return true;
};

export const getPaymentMethodName = (method: PaymentMethod): string => {
  const names: Record<PaymentMethod, string> = {
    upi: 'UPI',
    card: 'Credit/Debit Card',
    wallet: 'Wallet',
  };
  return names[method];
};

export const getPaymentStatusColor = (status: PaymentStatus): string => {
  const colors: Record<PaymentStatus, string> = {
    pending: '#FF9500',
    success: '#34C759',
    failed: '#FF3B30',
  };
  return colors[status];
};
