import React, { useEffect, useRef, useState } from "react";

interface Props {
  delay: number;
  duration: number;
  animateFunction: string;
  easing: string;
  animateType: string;
  text: string;
}

export default function AnimatedWord({ delay, duration, animateFunction, easing, animateType, text }: Props) {
  const textRef = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: "0px", // No margin around the root
      threshold: 0.5, // Trigger when 50% of the target is visible
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Do something when the target becomes visible
        } else {
          setIsVisible(false);
          // Do something when the target is not visible
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    // Start observing the target element
    if (textRef.current) {
      observer.observe(textRef.current);
    }

    // Clean up the observer when the component is unmounted
    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []); // Run effect only once on component mount

  useEffect(() => {
    if (!textRef.current) return;

    const text = textRef.current.textContent;
    const spaceIndices: number[] = [];
    let index = text.indexOf(" ");

    while (index !== -1) {
      spaceIndices.push(index);
      index = text.indexOf(" ", index + 1);
    }

    const splitLetters = () => {
      textRef.current.innerHTML = text!
        .split("")
        .map(
          (letter, index, array) =>
            `<span class='letter' style="--letter-delay: ${
              index * delay
            }s; --easing-function:${easing}; --duration:${duration}s; --animation-function:${animateFunction};">${letter}${
              spaceIndices.includes(index + 1) ? "&nbsp;" : ""
            }</span>`
        )
        .join("");
    };

    const splitWords = () => {
      textRef.current.innerHTML = text!
        .split(" ")
        .map(
          (word, index) =>
            `<span class='word' style="--letter-delay: ${
              index * delay
            }s; --easing-function:${easing}; --duration:${duration}s; --animation-function:${animateFunction};">${word}</span>`
        )
        .join("  ");
    };

    const entireSentence = () => {
      textRef.current.classList.add("animate", "all-sentence");
      textRef.current.style.cssText = `--letter-delay: ${delay}s; --easing-function: ${easing}; --duration: ${duration}s; --animation-function: ${animateFunction};`;
    };

    animateType === "letters" ? splitLetters() : animateType === "words" ? splitWords() : entireSentence();
  }, [delay, duration, easing, animateFunction, animateType]);

  return (
    <>
      <h1 className={`ml3 ${isVisible ? "animate" : ""}`} ref={textRef}>
        {text}
      </h1>
    </>
  );
}
