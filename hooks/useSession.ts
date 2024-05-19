import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/interfaces/user";
import { toast } from "sonner";
interface SessionStore {
  isLogin: boolean;
  user: User;
  login: (data: User) => void;
  logout: () => void;
}

const useSessionUser = create<SessionStore>()(
  persist(
    (set, get) => ({
      isLogin: false,
      user: {} as User,
      login: (data: User) => {
        set({ isLogin: true, user: data });
        toast.success(`Xin chào <b>${data.name}</b>!`, {
          description: "Đăng nhập thành công! ",
        });
      },
      logout: () => {
        set({ isLogin: false, user: {} as User });
        toast.success("Bạn đã đăng xuất!");
      },
    }),
    {
      name: "session-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSessionUser;
