"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type HeaderUserMenuProps = Readonly<{
  userName: string;
}>;

export function HeaderUserMenu({ userName }: HeaderUserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  return (
    <div className="header-user-menu" ref={menuRef}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="header-user-menu__trigger"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <span className="header-user-menu__avatar" aria-hidden="true" />
        <span className="header-user-menu__name">{userName}</span>
        <span className="header-user-menu__chevron" aria-hidden="true" />
      </button>

      {isOpen ? (
        <div className="header-user-menu__panel" role="menu">
          <Link className="header-user-menu__item" href="/orders" role="menuitem">
            <span className="header-user-menu__item-icon header-user-menu__item-icon--orders" />
            注文履歴
          </Link>
          <span
            aria-disabled="true"
            className="header-user-menu__item header-user-menu__item--disabled"
            role="menuitem"
          >
            <span className="header-user-menu__item-icon header-user-menu__item-icon--account" />
            アカウント情報
          </span>
          <Link className="header-user-menu__item" href="/logout" role="menuitem">
            <span className="header-user-menu__item-icon header-user-menu__item-icon--logout" />
            ログアウト
          </Link>
        </div>
      ) : null}
    </div>
  );
}
