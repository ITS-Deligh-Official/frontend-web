"use client";

import {
  AUTH_TOKEN_KEY,
} from "./constants";

export function getToken(): string | null {

  if (
    typeof window ===
    "undefined"
  ) {
    return null;
  }

  return window
    .localStorage
    .getItem(
      AUTH_TOKEN_KEY
    );
}

export function setToken(
  token: string
) {

  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  window
    .localStorage
    .setItem(
      AUTH_TOKEN_KEY,
      token
    );

  document.cookie =
    `${AUTH_TOKEN_KEY}=${token}; path=/; max-age=${60 * 60 * 24 * 7}`;
}

export function clearToken() {

  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  window
    .localStorage
    .removeItem(
      AUTH_TOKEN_KEY
    );

  document.cookie =
    `${AUTH_TOKEN_KEY}=; path=/; max-age=0`;
}