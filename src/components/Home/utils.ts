interface AnimationHandlerOpts {
    delta: number;
    ref: React.RefObject<HTMLElement>;

}

export const animationHandler = ({delta, ref}: AnimationHandlerOpts) => {

    const maxDelta = window.innerWidth / 2;

    const percentage = delta / maxDelta * -100;
    const nextPercentage = parseFloat(ref.current!.dataset.prevPercentage ?? "0") + percentage;

    const nextPercentageLimited = Math.min(Math.max(nextPercentage, -100), 0);

    ref.current!.dataset.percentage = nextPercentageLimited.toString();
    ref.current!.animate({transform: `translate(${nextPercentageLimited}%, -50%)`}, {duration: 1200, fill: "forwards"});

    for (const image of ref.current!.getElementsByTagName("img")) {
      image.animate({ objectPosition: `${nextPercentageLimited + 100}% 50%`}, {duration: 1200, fill: "forwards"});
    }

}