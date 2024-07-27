"use client";

import { ReactHTMLElement, ReactNode, useEffect, useState } from "react";
import React from "react";

interface Props {
  children: ReactNode;
}

const HydrationResolver = ({ children }: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return children;
};

export default HydrationResolver;
