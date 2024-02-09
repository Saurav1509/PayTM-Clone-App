import { atom } from 'recoil'

export const firstNameAtom = atom({
  key: 'firstNameAtom',
  default: ''
});

export const lastNameAtom = atom({
  key: 'lastNameAtom',
  default: ''
});

export const usernameAtom = atom({
  key: 'usernameAtom',
  default: ''
});

export const passwordAtom = atom({
  key: "passwordAtom",
  default: ''
})

export const usersAtom = atom({
  key: "usersAtom",
  default: []
})

export const filterAtom = atom({
  key: "filterAtom",
  default: ""
})

export const amountAtom = atom({
  key: "amountAtom",
  default: 0
})

export const balanceAtom = atom({
  key: "balanceAtom",
  default: 0
})
