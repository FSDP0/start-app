const IS_ACTIVATE = {
  ACTIVE: "active",
  DEACTIVE: "deactive"
} as const;

export type IS_ACTIVATE = (typeof IS_ACTIVATE)[keyof typeof IS_ACTIVATE];
