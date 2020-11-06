const math = require("mathjs");

const baseFunction = math.parse(
    "(8 / 5) + (2 / 5) * y - (1 / 5) * x - (3 / 2) e ^ (-(x ^ 2 + 2 y ^ 2))"
);

const xDerivation = math.derivative(baseFunction, "x", { simplify: true });
const yDerivation = math.derivative(baseFunction, "y", { simplify: true });

let currentPoint = { x: 1, y: 1 };

let stepLength = 1;

const iterations = [
    {
        x: currentPoint.x,
        y: currentPoint.x,
        z: baseFunction.evaluate(currentPoint),
        stepLength,
    },
];

for (let i = 1; i < 100; i++) {
    const currentGradient = {
        x: xDerivation.evaluate(currentPoint),
        y: yDerivation.evaluate(currentPoint),
    };
    const currentZ = baseFunction.evaluate(currentPoint);

    const nextPoint = {
        x: currentPoint.x - stepLength * currentGradient.x,
        y: currentPoint.y - stepLength * currentGradient.y,
    };

    const nextZ = baseFunction.evaluate(nextPoint);

    if (nextZ < currentZ) {
        currentPoint = nextPoint;

        iterations.push({
            x: currentPoint.x,
            y: currentPoint.y,
            z: currentZ,
            stepLength,
        });
    } else {
        stepLength = stepLength / 2;
    }
}

console.table(
    iterations.map((iteration) => ({
        ...iteration,
        x: Number(iteration.x.toFixed(5)),
        y: Number(iteration.y.toFixed(5)),
        z: Number(iteration.z.toFixed(5)),
    }))
);
