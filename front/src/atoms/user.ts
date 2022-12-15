import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface User {
  id: string | null;
  nickname: string | null;
}

const { persistAtom } = recoilPersist();

export const userState = atom<User | null>({
  key: "userState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export default userState;
