import { useEffect, useRef, useState, Children } from "react";

/**
 * Animate
 * ------
 * Wraps content and fades/slides it in. Drop it anywhere in the tree —
 * it doesn't need to sit at the app root.
 *
 * Props:
 *   trigger  "mount" | "scroll"
 *            "mount"  -> plays as soon as it renders (above-the-fold content)
 *            "scroll" -> plays once, the first time it enters the viewport
 *                        (use this for anything that can load off-screen)
 *   stagger  boolean — if true, each direct child animates in one after
 *            another instead of all at once
 *   delay    base delay in seconds before this element (or its first
 *            child, if staggered) starts
 *   step     seconds added per child when stagger is true
 *   as       tag to render as (default "div")
 *
 * Usage:
 *   <Reveal><h1>Hello</h1></Reveal>
 *   <Reveal delay={0.2}><p>Comes in a bit later</p></Reveal>
 *   <Reveal stagger step={0.1}>
 *     <Card /> <Card /> <Card />
 *   </Reveal>
 *   <Reveal trigger="scroll"><Section /></Reveal>
 */
export default function Animate({
  children,
  trigger = "mount",
  stagger = false,
  delay = 0,
  step = 0.1,
  as: Tag = "div",
  className = "",
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (trigger === "mount") {
      // tiny delay so the browser paints the initial (hidden) state first,
      // otherwise there's nothing for the CSS transition to animate from
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [trigger]);

  if (stagger) {
    const items = Children.toArray(children);
    return (
      <Tag ref={ref} className={className} {...rest}>
        {items.map((child, i) => (
          <div
            key={i}
            className={`reveal-el${visible ? " reveal-visible" : ""}`}
            style={{ transitionDelay: `${delay + i * step}s` }}
          >
            {child}
          </div>
        ))}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      className={`reveal-el${visible ? " reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
