export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}



export interface CartItem {
    id:number;
    quantity: number;
    price: number
    title: string
    image: string
}


export interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    increaseQty: (id: number) => void;
    decreaseQty: (id: number) => void;
    getTotalPrice: () => number;
    clearCart: () => void;
    itemCount: ()=> number;
    isInCart: (productId: number) => boolean;
}