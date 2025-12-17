import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  onVisible: () => void;
};

export default function SafePaginatedWrapper({ children, onVisible }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onVisible();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [onVisible]);

  return <div ref={ref}>{children}</div>;
}
