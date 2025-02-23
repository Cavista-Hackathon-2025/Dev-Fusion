import { useState } from "react";
import Link, { LinkProps } from "next/link";
import Image from "next/image";

export default function LinkWithLoading({
  children,
  ...props
}: LinkProps & { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => setIsLoading(true);

  return (
    <>
      <Link {...props} onClick={handleClick}>
        {children}
      </Link>
      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-50">
          <Image
            src="/logo.svg"
            alt="Loading..."
            width={64}
            height={64}
            className="animate-spin"
          />
        </div>
      )}
    </>
  );
}
