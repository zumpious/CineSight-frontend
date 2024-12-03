import Link from 'next/link';
import { PillLinkProps } from './PillLink.types';

export default function PillLink({ href, text }: PillLinkProps) {
  return (
    <Link href={href}>
      <div className="inline-block border px-8 py-3 rounded-full tansform transition-transform hover:scale-105">
        {text}
      </div>
    </Link>
  );
}
