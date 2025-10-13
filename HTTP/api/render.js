const render = async (name, shape) => {
  if (!shape) return "Shape is not found";

  const points = [];
  for (const key in shape) {
    const point = shape[key];
    points.push(point);
  }

  const svg = [];
  svg.push('<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">');
  svg.push('<polygon points="');
  svg.push(points.map((point) => `${point.x},${point.y}`).join(" "));
  svg.push('" fill="none" stroke="black" /></svg>');

  return svg.join("");
};
