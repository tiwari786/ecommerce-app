import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { CartContextType, CartItem, Product } from "../types"
import { toast } from "react-toastify"



const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([])

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart])

    const addToCart = (product: Product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
    
            if (existing) {
                toast.info("quantity increased!");
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
    
            toast.success("added to cart!");
            return [...prev, { ...product, quantity: 1 }];
        });
    };
    

    const removeFromCart = (id: number) => {
        setCart(prev => {
            const found = prev.find(item => item.id === id);
        
            if (found) {
                toast.error("removed from cart!");
            }
        
            return prev.filter(item => item.id !== id);
        });        
    }

    const increaseQty = (id: number) => {
        setCart(prev => prev.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            ))
    }

    const decreaseQty = (id: number) => {
        setCart(prev => prev.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            ).filter((item) => item.quantity > 0)
        )
    }

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0)
    }

    const itemCount = () => {
        return cart.length
    }

    const clearCart = () => {
        setCart([])
        toast.info("Cart cleared!");
    }

    const isInCart = (productId: number) => {
        return cart.some((item) => item.id === productId);
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, itemCount, removeFromCart, increaseQty, decreaseQty, getTotalPrice, clearCart, isInCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => {
    const context = useContext(CartContext)
    if (!context) throw new Error("CartProvider missing")
    return context;
}