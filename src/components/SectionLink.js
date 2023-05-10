"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SectionLink = ({ section }) => {
  const path = usePathname();

  return (
    <Link
      className={`section ${path === section.url && "text-decoration"}`}
      href={section.url}
    >
      <div className="text-2xl">{section.logo}</div>
      <label>{section.label}</label>
    </Link>
  );
};

export default SectionLink;
