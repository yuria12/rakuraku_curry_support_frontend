export const mockAuthSession = {
  isLoggedIn: true,
  user: {
    email: "user@example.com",
    id: "user-001",
    name: "テストユーザー",
    address: "東京都千代田区丸の内1-1-1",
    phone: "03-1234-5678",
    postalCode: "100-0005",
    role: "user",
  },
} as const;
