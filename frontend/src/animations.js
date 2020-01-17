import anime from "animejs";

export function shake(target) {
  return anime({
    targets: target,
    easing: "easeInOutSine",
    duration: 550,
    translateX: [
      { value: 16 * -1 },
      { value: 16 },
      { value: 16 / -2 },
      { value: 16 / 2 },
      { value: 0 }
    ],
    autoplay: true
  });
}
