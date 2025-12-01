"use client";

/*
 * Cara makenya (How to use):
 * 
 * <SanitizedContent content={htmlString} className="optional-className" />
 * 
 * - `content` harus berupa string HTML yang ingin ditampilkan.
 * - Secara otomatis, konten akan di-sanitize supaya aman dari XSS, lalu di-render sebagai HTML.
 * - Bisa tambahkan className (misal: untuk styling prose).
 *
 * Contoh:
 * <SanitizedContent content={'<p>Halo <strong>world</strong>!</p>'} className="prose" />
 */

import DOMPurify from "dompurify";
type Props = {
  content: string;
  className?: string;
};
const SanitizedContent = ({ content, className }: Props) => {
  // Sanitize HTML yang diterima dari props sebelum dirender


  return (
    <div
      className={className}>
        {content}
      </div>
  );
};

export default SanitizedContent;