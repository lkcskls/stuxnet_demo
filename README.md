# Stuxnet Demo

A visual demonstration of the Stuxnet attack on industrial control systems. The app simulates a factory with a centrifuge, PLC, and SCADA interface, and shows how Stuxnet modifies PLC logic, manipulates sensor data, and hides the attack from operators.

## Features

- **Stuxnet lifecycle phases** you can step through (Previous / Next): from normal operation, through initial compromise (USB infection), dormant presence and reconnaissance, PLC logic subversion, overspeed and underspeed sabotage cycles, to alternating cycles with progressive damage.
- **Five views** that update in real time:
  - **Physical process (Factory)** – centrifuge speed, temperature, status (real values).
  - **PLC** – controller setpoint and output (modified by Stuxnet from phase 3 onward).
  - **SCADA** – what the operator sees (spoofed values when attack is active).
  - **Stuxnet module** – attack status per phase.
  - **Chart** – Real speed vs Shown speed over time (divergence when Stuxnet spoofs).

Runs fully **offline** after build (static export).

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build and run offline

The app is built as a **static export** (no Node server required):

```bash
npm run build
```

Output is in the `out/` directory. Serve it with any static server, for example:

```bash
npx serve out
```

Then open the URL shown (e.g. [http://localhost:3000](http://localhost:3000)). You can also open `out/index.html` in a browser (some features may require a local server for correct routing).

## Tech

- [Next.js](https://nextjs.org) (App Router, static export)
- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Recharts](https://recharts.org) for the Real vs Shown speed chart
- [Framer Motion](https://www.framer.com/motion/) for animations
