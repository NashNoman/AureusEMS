"use client";

import { Provider } from "react-redux";
import store from "@/redux/builder/store";
import { ReactNode } from "react";

export default function BuilderReduxProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
