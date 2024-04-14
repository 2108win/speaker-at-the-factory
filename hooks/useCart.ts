import { Product } from "@/interfaces/product";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
interface CartStore {
  items: Product[];
  addItem: (data: Product, onClick: () => void) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product, onClick: () => void) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          return toast.warning("Sản phẩm đã có trong giỏ hàng.", {
            action: {
              label: "Xem giỏ hàng",
              onClick: onClick,
            },
          });
        }

        set({ items: [...get().items, data] });
        toast.success("Sản phẩm đã được thêm vào giỏ hàng.", {
          action: {
            label: "Xem giỏ hàng",
            onClick: onClick,
          },
        });
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success("Sản phẩm đã được xóa khỏi giỏ hàng.");
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
