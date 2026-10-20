'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { request } from '@/lib/api';
import { money } from '@/lib/utils';

type Order = {
  _id: string;
  totalOrderPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
};

type OrdersResult = {
  userId: string;
  orders: Order[];
  error: string;
};

export default function OrdersView() {
  const { data: session, status } = useSession();
  const token = session?.accessToken;
  const userId = session?.userId;
  const [result, setResult] = useState<OrdersResult | null>(null);

  useEffect(() => {
    if (!token || !userId) return;
    let cancelled = false;

    request<Order[]>(`/orders/user/${encodeURIComponent(userId)}`, {}, token)
      .then((orders) => {
        if (!cancelled) {
          setResult({ userId, orders: Array.isArray(orders) ? orders : [], error: '' });
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setResult({
            userId,
            orders: [],
            error: error instanceof Error ? error.message : 'Could not load orders.',
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [token, userId]);

  if (status === 'loading') return <p>Loading orders...</p>;
  if (!session) {
    return <p>Please <Link href="/login" className="underline text-leaf">sign in</Link> to view orders.</p>;
  }
  if (!userId || !token) {
    return (
      <p role="alert" className="bg-amber-50 rounded-xl p-5">
        We couldn&apos;t find your store account ID. Sign out and sign in again to refresh your session.
      </p>
    );
  }
  if (!result || result.userId !== userId) return <p>Loading orders...</p>;
  if (result.error) {
    return <p role="alert" className="bg-amber-50 rounded-xl p-5">Could not load your orders: {result.error}</p>;
  }
  if (result.orders.length === 0) {
    return (
      <p className="bg-cream rounded-xl p-10">
        No orders yet. <Link className="underline text-leaf" href="/shop">Start shopping</Link>.
      </p>
    );
  }

  return (
    <div className="grid gap-4">
      {result.orders.map((order) => (
        <article className="border rounded-xl p-5" key={order._id}>
          <div className="flex flex-wrap justify-between gap-3">
            <div>
              <p className="font-bold">Order #{order._id.slice(-8)}</p>
              <p className="text-sm text-slate-500">
                {new Date(order.createdAt).toLocaleDateString('en-EG')}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-pine">{money(order.totalOrderPrice)}</p>
              <p className="text-xs text-slate-500">
                {order.isDelivered ? 'Delivered' : 'Processing'} · {order.isPaid ? 'Paid' : 'Unpaid'}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
