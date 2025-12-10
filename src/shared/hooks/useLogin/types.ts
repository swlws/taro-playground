export type UseLoginResult = {
  login: () => Promise<{
    type: string;
    code?: string;
    token?: string | null;
  }>;
};
