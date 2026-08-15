"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { shopifyClientBrowser as shopifyClient } from "./client-browser";
import {CART_CREATE_MUTATION,CART_LINES_ADD_MUTATION,CART_LINES_UPDATE_MUTATION,CART_LINES_REMOVE_MUTATION,} from "./mutation";
import { CART_QUERY } from "./queries";

type CartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    image: { url: string; altText: string | null } | null;
    price: { amount: string; currencyCode: string };
    product: { title: string; handle: string };
  };
};

type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: { amount: string; currencyCode: string } };
  lines: { nodes: CartLine[] };
};

type CartContextType = {
  cartId: string | null;
  totalQuantity: number;
  checkoutUrl: string | null;
  lines: CartLine[];
  subtotal: { amount: string; currencyCode: string } | null;
  isOpen: boolean;
  isLoading: boolean;
  addToCart: (merchandiseId: string, quantity?: number) => Promise<void>;
  updateLineQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartId, setCartId] = useState<string | null>(null);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [lines, setLines] = useState<CartLine[]>([]);
  const [subtotal, setSubtotal] = useState<{ amount: string; currencyCode: string } | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function syncFromCart(cart: Cart) {
    setCartId(cart.id);
    setTotalQuantity(cart.totalQuantity);
    setCheckoutUrl(cart.checkoutUrl);
    setLines(cart.lines.nodes);
    setSubtotal(cart.cost.subtotalAmount);
  }

  useEffect(() => {
    const stored = localStorage.getItem("shopify_cart_id");
    if (!stored) return;

    shopifyClient
      .request(CART_QUERY, { variables: { cartId: stored } })
      .then(({ data }) => {
        if (data?.cart) {
          syncFromCart(data.cart);
        } else {
          localStorage.removeItem("shopify_cart_id");
        }
      })
      .catch(() => localStorage.removeItem("shopify_cart_id"));
  }, []);

  async function addToCart(merchandiseId: string, quantity = 1) {
    setIsLoading(true);
    try {
      if (!cartId) {
        const { data } = await shopifyClient.request(CART_CREATE_MUTATION, {
          variables: { lines: [{ merchandiseId, quantity }] },
        });
        const cart = data?.cartCreate?.cart;
        if (cart) {
          syncFromCart(cart);
          localStorage.setItem("shopify_cart_id", cart.id);
        }
      } else {
        const { data } = await shopifyClient.request(CART_LINES_ADD_MUTATION, {
          variables: { cartId, lines: [{ merchandiseId, quantity }] },
        });
        const cart = data?.cartLinesAdd?.cart;
        if (cart) syncFromCart(cart);
      }
      setIsOpen(true);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateLineQuantity(lineId: string, quantity: number) {
    if (!cartId) return;
    setIsLoading(true);
    try {
      const { data } = await shopifyClient.request(CART_LINES_UPDATE_MUTATION, {
        variables: { cartId, lines: [{ id: lineId, quantity }] },
      });
      const cart = data?.cartLinesUpdate?.cart;
      if (cart) syncFromCart(cart);
    } finally {
      setIsLoading(false);
    }
  }

  async function removeLine(lineId: string) {
    if (!cartId) return;
    setIsLoading(true);
    try {
      const { data } = await shopifyClient.request(CART_LINES_REMOVE_MUTATION, {
        variables: { cartId, lineIds: [lineId] },
      });
      const cart = data?.cartLinesRemove?.cart;
      if (cart) syncFromCart(cart);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartId,
        totalQuantity,
        checkoutUrl,
        lines,
        subtotal,
        isOpen,
        isLoading,
        addToCart,
        updateLineQuantity,
        removeLine,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}