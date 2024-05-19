import { Product } from "@/interfaces/product";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";
interface CartStore {
  items: Product[];
  addItem: (data: Product, quantity: number, onClick?: () => void, hasToast?: boolean) => void;
  removeItem: (id: string, hasToast?: boolean) => void;
  removeAll: (hasToast?: boolean) => void;
  updateItem: (id: string, quantity: number) => void;
  checkedItem: (id: string, checked: boolean) => void;
  isLoading: boolean;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      isLoading: false,
      addItem: (data: Product, quantity, onClick?: () => void, hasToast = true) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);
        if (existingItem) {
          set({
            items: get().items.map((item) =>
              item.id === existingItem.id
                ? { ...item, quantity: item.quantity + quantity, checked: true }
                : item
            ),
          });
          if (hasToast || onClick == null)
            return toast.success(
              "Sản phẩm đã được cập nhật trong giỏ hàng.",
              onClick && {
                action: {
                  label: "Xem giỏ hàng",
                  onClick: onClick,
                },
              }
            );
        }

        // set({ items: [...get().items, { ...data, quantity: 1 }] });
        set({ items: [{ ...data, quantity: quantity, checked: true }, ...currentItems] });
        if (hasToast || onClick == null)
          return toast.success(
            "Sản phẩm đã được thêm vào giỏ hàng.",
            onClick && {
              action: {
                label: "Xem giỏ hàng",
                onClick: onClick,
              },
            }
          );
      },
      removeItem: (id: string, hasToast = true) => {
        const currentItems = get().items;
        const tempItems = currentItems.find((item) => item.id === id);
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        if (hasToast)
          toast.success(`Sản phẩm ${tempItems?.productName} đã được xóa khỏi giỏ hàng.`, {
            action: {
              label: tempItems ? "Hoàn tác" : "Tới trang sản phẩm",
              onClick: () => {
                tempItems
                  ? set({ items: [...get().items, tempItems] })
                  : set({ items: [...currentItems] });
              },
            },
          });
      },
      removeAll: (hasToast = true) => {
        const tempItems = get().items;
        set({ items: [] });
        if (hasToast)
          toast.success(`Tất cả sản phẩm đã được xóa khỏi giỏ hàng.`, {
            action: {
              label: "Hoàn tác",
              onClick: () => {
                tempItems && set({ items: [...tempItems] });
              },
            },
            duration: 20000,
          });
      },
      updateItem: (id: string, quantity: number) => {
        set({
          items: get().items.map((item) => (item.id === id ? { ...item, quantity } : item)),
        });
      },
      checkedItem: (id: string, checked: boolean) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === id);
        if (existingItem) {
          set({
            items: get().items.map((item) =>
              item.id === existingItem.id ? { ...item, checked: checked } : item
            ),
          });
        } else {
          set({
            items: get().items.map((item) =>
              item.id === id ? { ...item, checked: checked } : item
            ),
          });
        }
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
