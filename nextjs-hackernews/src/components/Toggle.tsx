"use client";
import { useState } from "react";

export default function Toggle({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  return (
    <>
      <div className={["toggle", open ? "open" : ""].join(" ")}>
        <a onClick={() => setOpen((o) => !o)}>
          {open ? "[-]" : "[+] comments collapsed"}
        </a>
      </div>
      <ul
        className="comment-children"
        style={{ display: open ? "block" : "none" }}
      >
        {children}
      </ul>
    </>
  );
}
