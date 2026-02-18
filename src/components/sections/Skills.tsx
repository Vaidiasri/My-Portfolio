import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { portfolioData } from "@/data/portfolio";

// Deep Space Theme Colors
const THEME_COLORS = [
  "#8b5cf6", // Primary (Electric Violet)
  "#06b6d4", // Secondary (Cyan)
  "#f8fafc", // Foreground (Starlight)
  "#d8b4fe", // Light Violet
  "#22d3ee", // Light Cyan
];

const Skills = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<{
    name: string;
    level: number;
  } | null>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    // Safety check for data
    if (!portfolioData.skills || portfolioData.skills.length === 0) {
      console.warn("Skills data is missing or empty");
      return;
    }

    let cleanupFunction: (() => void) | undefined;

    const initMatter = () => {
      if (!sceneRef.current) return;

      // Module aliases
      const Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Bodies = Matter.Bodies,
        Composite = Matter.Composite,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Events = Matter.Events,
        Query = Matter.Query,
        Body = Matter.Body;

      // Create engine
      const engine = Engine.create();
      engineRef.current = engine;

      // Zero gravity for floating effect
      engine.world.gravity.y = 0;
      engine.world.gravity.x = 0;

      // Create renderer
      const width = sceneRef.current.clientWidth || window.innerWidth;
      const height = 600;

      const render = Render.create({
        element: sceneRef.current,
        engine: engine,
        options: {
          width,
          height,
          wireframes: false,
          background: "transparent",
          pixelRatio: window.devicePixelRatio,
        },
      });

      // Create boundaries (invisible)
      const wallOptions = {
        isStatic: true,
        render: { fillStyle: "transparent" },
        restitution: 0.8,
      };

      const ground = Bodies.rectangle(
        width / 2,
        height + 60,
        width,
        100,
        wallOptions,
      );
      const ceiling = Bodies.rectangle(width / 2, -60, width, 100, wallOptions);
      const leftWall = Bodies.rectangle(
        -60,
        height / 2,
        100,
        height,
        wallOptions,
      );
      const rightWall = Bodies.rectangle(
        width + 60,
        height / 2,
        100,
        height,
        wallOptions,
      );

      Composite.add(engine.world, [ground, ceiling, leftWall, rightWall]);

      // Create skill bodies
      const skillBodies = portfolioData.skills.map((skill) => {
        const radius = 45; // Uniform size
        const x = Math.random() * (width - 100) + 50;
        const y = Math.random() * (height - 100) + 50;

        const body = Bodies.circle(x, y, radius, {
          restitution: 0.9,
          friction: 0.001,
          frictionAir: 0.001,
          render: {
            fillStyle: "#1a1a1a",
            strokeStyle: "rgba(255, 255, 255, 0.2)",
            lineWidth: 2,
          },
          label: skill.name,
        });

        // Give initial random velocity
        Body.setVelocity(body, {
          x: (Math.random() - 0.5) * 5,
          y: (Math.random() - 0.5) * 5,
        });

        return body;
      });

      Composite.add(engine.world, skillBodies);

      // Add mouse control
      const mouse = Mouse.create(render.canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false },
        },
      });

      // Remove scrolling interference
      mouseConstraint.mouse.element.removeEventListener(
        "mousewheel",
        (mouseConstraint.mouse as any).mousewheel,
      );
      mouseConstraint.mouse.element.removeEventListener(
        "DOMMouseScroll",
        (mouseConstraint.mouse as any).mousewheel,
      );

      Composite.add(engine.world, mouseConstraint);
      render.mouse = mouse;

      // --- Hover Logic ---
      let hoveredBodyId: number | null = null;

      Events.on(mouseConstraint, "mousemove", (event) => {
        const mousePosition = event.mouse.position;
        const hoveredBodies = Query.point(skillBodies, mousePosition);

        if (hoveredBodies.length > 0) {
          const body = hoveredBodies[0];
          if (hoveredBodyId !== body.id) {
            hoveredBodyId = body.id;
            document.body.style.cursor = "pointer";

            const skill = portfolioData.skills.find(
              (s) => s.name === body.label,
            );
            if (skill) setHoveredSkill(skill);

            body.render.fillStyle =
              THEME_COLORS[Math.floor(Math.random() * THEME_COLORS.length)];
            body.render.lineWidth = 4;
            body.render.strokeStyle = "#ffffff";
          }
        } else {
          if (hoveredBodyId !== null) {
            const body = skillBodies.find((b) => b.id === hoveredBodyId);
            if (body) {
              body.render.fillStyle = "#1a1a1a";
              body.render.lineWidth = 2;
              body.render.strokeStyle = "rgba(255, 255, 255, 0.2)";
            }

            hoveredBodyId = null;
            document.body.style.cursor = "default";
            setHoveredSkill(null);
          }
        }
      });

      // --- Physics Update Loop ---
      Events.on(engine, "beforeUpdate", () => {
        skillBodies.forEach((body) => {
          const speed = body.speed;

          if (mouseConstraint.body === body) return;

          if (body.id === hoveredBodyId) {
            const targetX = width / 2;
            const targetY = height * 0.25;
            const forceX = (targetX - body.position.x) * 0.00005;
            const forceY = (targetY - body.position.y) * 0.00005;

            Body.applyForce(body, body.position, { x: forceX, y: forceY });
            Body.setVelocity(body, {
              x: body.velocity.x * 0.9,
              y: body.velocity.y * 0.9,
            });
            Body.setAngularVelocity(body, body.angularVelocity * 0.9);
            return;
          }

          if (hoveredBodyId !== null && body.id !== hoveredBodyId) {
            Body.applyForce(body, body.position, { x: 0, y: 0.001 });
            Body.setVelocity(body, {
              x: body.velocity.x * 0.95,
              y: body.velocity.y,
            });
          } else if (hoveredBodyId === null) {
            if (speed < 0.5) {
              Body.applyForce(body, body.position, {
                x: (Math.random() - 0.5) * 0.001,
                y: (Math.random() - 0.5) * 0.001,
              });
            }
          }
        });
      });

      // --- Collision Logic ---
      Events.on(engine, "collisionStart", (event) => {
        event.pairs.forEach((pair) => {
          const { bodyA, bodyB } = pair;
          if (bodyA.label && !bodyA.isStatic && bodyA.id !== hoveredBodyId) {
            bodyA.render.fillStyle =
              THEME_COLORS[Math.floor(Math.random() * THEME_COLORS.length)];
            setTimeout(() => {
              if (bodyA && bodyA.render && bodyA.id !== hoveredBodyId)
                bodyA.render.fillStyle = "#1a1a1a";
            }, 300);
          }
          if (bodyB.label && !bodyB.isStatic && bodyB.id !== hoveredBodyId) {
            bodyB.render.fillStyle =
              THEME_COLORS[Math.floor(Math.random() * THEME_COLORS.length)];
            setTimeout(() => {
              if (bodyB && bodyB.render && bodyB.id !== hoveredBodyId)
                bodyB.render.fillStyle = "#1a1a1a";
            }, 300);
          }
        });
      });

      Render.run(render);
      const runner = Runner.create();
      Runner.run(runner, engine);

      // Render Text
      Events.on(render, "afterRender", () => {
        const context = render.context;
        context.font = "bold 12px 'Space Grotesk', sans-serif";
        context.textAlign = "center";

        skillBodies.forEach((body) => {
          const { x, y } = body.position;
          const isDark = body.render.fillStyle === "#1a1a1a";
          context.fillStyle = isDark ? "#ffffff" : "#000000";
          context.fillText(body.label, x, y);
        });
      });

      // Handle resize
      const handleResize = () => {
        if (!sceneRef.current) return;
        render.canvas.width = sceneRef.current.clientWidth;
        render.canvas.height = 600;

        Matter.Body.setPosition(ground, {
          x: sceneRef.current.clientWidth / 2,
          y: 650,
        });
        Matter.Body.setPosition(ceiling, {
          x: sceneRef.current.clientWidth / 2,
          y: -50,
        });
        Matter.Body.setPosition(rightWall, {
          x: sceneRef.current.clientWidth + 60,
          y: 300,
        });
      };

      window.addEventListener("resize", handleResize);

      // Set cleanup function
      cleanupFunction = () => {
        Render.stop(render);
        Runner.stop(runner);
        if (render.canvas) render.canvas.remove();
        window.removeEventListener("resize", handleResize);
      };
    };

    // Initialize with delay to ensure DOM is ready
    const timer = setTimeout(initMatter, 100);

    return () => {
      clearTimeout(timer);
      if (cleanupFunction) cleanupFunction();
      document.body.style.cursor = "default";
    };
  }, []);

  return (
    <section
      id="skills"
      className="py-20 relative overflow-hidden bg-background"
    >
      <div className="container mx-auto px-6 mb-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
          Technical <span className="text-gradient">Gravity</span>
        </h2>
        <p className="text-muted-foreground">Hover over a skill to focus.</p>
      </div>

      <div className="relative">
        {/* Canvas Container */}
        <div
          ref={sceneRef}
          className="w-full h-[600px] border-y border-white/5 relative bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary/5 via-background to-background"
        />

        {/* Hover Overlay Information */}
        {hoveredSkill && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 pointer-events-none z-10 glass p-8 rounded-2xl max-w-sm text-center transform transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
            <h3 className="text-3xl font-bold text-white mb-2 font-heading">
              {hoveredSkill.name}
            </h3>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-primary"
                style={{ width: `${hoveredSkill.level}%` }}
              />
            </div>
            <p className="text-muted-foreground">
              Proficiency: {hoveredSkill.level}%
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
