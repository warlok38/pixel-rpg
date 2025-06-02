export function moveTowards(person, destinationsPosition, speed) {
  let distanceToTravelX = destinationsPosition.x - person.position.x;
  let distanceToTravelY = destinationsPosition.y - person.position.y;

  let distance = Math.sqrt(distanceToTravelX ** 2 + distanceToTravelY ** 2);

  if (distance <= speed) {
    person.position.x = destinationsPosition.x;
    person.position.y = destinationsPosition.y;
  } else {
    let normalizedX = distanceToTravelX / distance;
    let normalizedY = distanceToTravelY / distance;

    person.position.x += normalizedX * speed;
    person.position.y += normalizedY * speed;

    distanceToTravelX = destinationsPosition.x - person.position.x;
    distanceToTravelY = destinationsPosition.y - person.position.y;

    distance = Math.sqrt(distanceToTravelX ** 2 + distanceToTravelY ** 2);
  }

  return distance;
}
