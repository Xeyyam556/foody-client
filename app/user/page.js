"use client";

import { useSearchParams } from "next/navigation";
import BasketComponent from "./components/BasketComponent";
import ProfileComponent from "./components/ProfileComponent";
import OrdersComponent from "./components/OrdersComponent";
import CheckoutComponent from "./components/CheckoutComponent";

export default function UserPage() {
    const searchParams = useSearchParams();
    const page = searchParams.get("page");

    return (
        <div>
            {page === "basket" && <BasketComponent />}
            {page === "profile" && <ProfileComponent />}
            {page === "orders" && <OrdersComponent />}
            {page === "checkout" && <CheckoutComponent />}
            {!page && <p>Welcome to your user dashboard!</p>}
        </div>
    );
}
