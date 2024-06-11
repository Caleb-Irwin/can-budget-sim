<script lang="ts">
  import Matter from "matter-js";
  import { onMount } from "svelte";
  import Jar from "$lib/jar-transparent.png";

  export let amountCents: number;

  var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

  let el: HTMLDivElement,
    ready = false;

  const WIDTH = 300,
    HEIGHT = 490,
    fillStyle = "transparent";

  const engine = Engine.create();

  onMount(() => {
    const render = Render.create({
      element: el,
      options: {
        height: HEIGHT,
        width: WIDTH,
        wireframes: false,
        background: "none",
      },
      engine: engine,
    });

    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    const leftSide = Bodies.rectangle(20, HEIGHT / 2 + 50, 15, HEIGHT, {
        isStatic: true,
        render: { fillStyle },
      }),
      rightSide = Bodies.rectangle(WIDTH - 25, HEIGHT / 2 + 60, 15, HEIGHT, {
        isStatic: true,
        render: { fillStyle },
      }),
      leftTop = Bodies.rectangle(60, 0, 15, 235, {
        isStatic: true,
        render: { fillStyle },
      }),
      rightTop = Bodies.rectangle(WIDTH - 75, 0, 15, 235, {
        isStatic: true,
        render: { fillStyle },
      }),
      ground = Bodies.rectangle(WIDTH / 2, HEIGHT - 7.5, WIDTH - 50, 15, {
        isStatic: true,
        render: { fillStyle },
      }),
      midLeft = Bodies.rectangle(0, 110, 130, 15, {
        isStatic: true,
        render: { fillStyle },
      }),
      midRight = Bodies.rectangle(WIDTH - 10, 110, 130, 15, {
        isStatic: true,
        render: { fillStyle },
      }),
      lid = Bodies.rectangle(WIDTH / 2, 10, WIDTH, 15, {
        isStatic: true,
        render: { fillStyle },
      });

    Composite.add(engine.world, [
      leftSide,
      rightSide,
      leftTop,
      rightTop,
      ground,
      midLeft,
      midRight,
      lid,
      mouseConstraint,
    ]);
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);
    ready = true;
  });

  function changeMaker(amountCents: number) {
    let centsLeft = amountCents;
    const toonies = Math.floor((centsLeft / 200) * 0.75);
    centsLeft = centsLeft - toonies * 200;
    const loonies = Math.floor((centsLeft / 100) * 0.8);
    centsLeft = centsLeft - loonies * 100;
    const quarters = Math.floor((centsLeft / 25) * 0.85);
    centsLeft = centsLeft - quarters * 25;
    const dimes = Math.floor((centsLeft / 10) * 0.9);
    centsLeft = centsLeft - dimes * 10;
    const nickels = Math.round(centsLeft / 5);
    centsLeft = centsLeft - nickels * 5;

    return {
      toonies,
      loonies,
      quarters,
      dimes,
      nickels,
    };
  }

  $: coins = changeMaker(amountCents);

  const currentCoins: { [key: string]: Matter.Body[] } = {
    toonies: [],
    loonies: [],
    quarters: [],
    dimes: [],
    nickels: [],
  };

  function addCoin(size: number, color: string, texture: string) {
    size = size * 0.95;
    const coinBody = Bodies.circle(
      (WIDTH + size) / 2 + (Math.random() - 0.5) * 100,
      (HEIGHT + size) / 2 + (Math.random() - 0.5) * 250,
      size,
      {
        restitution: 0.8,
        angle: 2 * Math.PI * Math.random(),
        render: {
          fillStyle: color,
          sprite: {
            texture,
            xScale: (size / 315) * 2,
            yScale: (size / 315) * 2,
          },
        },
      }
    );

    Composite.add(engine.world, coinBody);

    return coinBody;
  }

  function setCoins(
    count: number,
    stack: Matter.Body[],
    size: number,
    color: string,
    texture: string
  ) {
    if (stack.length < count) {
      stack.push(addCoin(size, color, texture));
      return setCoins(count, stack, size, color, texture);
    } else if (stack.length > count && stack.length >= 1) {
      Composite.remove(
        engine.world,
        (
          stack.splice(
            Math.floor(Math.random() * stack.length),
            1
          ) as Matter.Body[]
        )[0]
      );
      return setCoins(count, stack, size, color, texture);
    }
  }

  $: {
    if (ready) {
      setCoins(
        coins.toonies,
        currentCoins.toonies,
        28,
        "#C7C7C7",
        "./static/toonie.png"
      );
      setCoins(
        coins.loonies,
        currentCoins.loonies,
        26,
        "#B3AB6B",
        "./static/loonie.png"
      );
      setCoins(
        coins.quarters,
        currentCoins.quarters,
        24,
        "#8E8E8E",
        "./static/quarter.png"
      );
      setCoins(
        coins.dimes,
        currentCoins.dimes,
        18,
        "#BABABA",
        "./static/dime.png"
      );
      setCoins(
        coins.nickels,
        currentCoins.nickels,
        21,
        "#E4E4E4",
        "./static/nickel.png"
      );
    }
  }
</script>

<div class=" w-[290px] h-[500px]">
  <img src={Jar} alt="" class="absolute h-[500px] pointer-events-none" />
  <div class="w-[290px] h-[400px]" bind:this={el}></div>
</div>
