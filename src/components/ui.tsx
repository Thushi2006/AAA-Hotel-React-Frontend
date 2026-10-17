import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { useHotel } from "../lib/context";
import type { Page } from "../lib/types";
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 50"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 41 22 10l15 31M27 41 42 10l15 31M13 30h18M33 30h18"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path d="M3 45h58" stroke="currentColor" strokeWidth=".7" />
    </svg>
  );
}
export function Brand() {
  return (
    <span className="brand">
      <Mark />
      <span>
        AAA HOTEL<small>S R I &nbsp; L A N K A</small>
      </span>
    </span>
  );
}
export function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p className={"eyebrow " + (light ? "light" : "")}>
      <span />
      {children}
    </p>
  );
}
export function TextLink({
  children,
  onClick,
  page,
  light = false,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  page?: Page;
  light?: boolean;
  className?: string;
}) {
  const { navigate } = useHotel();
  return (
    <button
      className={`text-link ${light ? "light" : ""} ${className}`}
      onClick={onClick ?? (() => page && navigate(page))}
    >
      {children}
      <ArrowUpRight size={17} />
    </button>
  );
}
export function Button({
  children,
  onClick,
  type = "button",
  variant = "dark",
  disabled = false,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "dark" | "light" | "outline";
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      className={`button button-${variant} shrink-0 ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{children}</span>
      <ArrowUpRight size={16} />
    </button>
  );
}
export function CircleArrow({
  onClick,
  label = "Explore",
  direction = "right",
}: {
  onClick: () => void;
  label?: string;
  direction?: "right" | "down";
}) {
  return (
    <button className="circle-arrow" onClick={onClick} aria-label={label}>
      {direction === "down" ? (
        <ArrowDown size={20} />
      ) : (
        <ArrowRight size={20} />
      )}
    </button>
  );
}
export function Image({
  src,
  alt,
  className = "",
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
export function Modal({
  title,
  children,
  onClose,
  wide = false,
  className = "",
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  wide?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const el = ref.current;
    const before = document.activeElement as HTMLElement | null;
    el?.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      el?.close();
      document.body.style.overflow = old;
      before?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`modal ${wide ? "modal-wide" : ""} ${className}`}
      aria-label={title}
      onCancel={(e) => {
        e.preventDefault();
        closeRef.current();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeRef.current();
      }}
    >
      <div className="modal-inner">
        <div className="modal-top">
          <span className="eyebrow">AAA HOTEL · {title}</span>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={22} />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
export function PageHeading({
  eyebrow,
  title,
  italic,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  italic: string;
  description: string;
  image?: string;
}) {
  return (
    <section className={`page-heading ${image ? "with-image" : ""}`}>
      {image && (
        <Image src={image} alt="An impression of an island escape" eager />
      )}
      <div className="container relative">
        <Eyebrow light={!!image}>{eyebrow}</Eyebrow>
        <h1>
          {title}
          <br />
          <i>{italic}</i>
        </h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
export function PhotoNote() {
  return (
    <span className="photo-note">
      A visual impression of the AAA experience
    </span>
  );
}
