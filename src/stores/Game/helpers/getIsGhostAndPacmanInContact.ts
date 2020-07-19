// TODO: Research if same grid is more efficient
export const getIsGhostAndPacmanInContact = (options: {
  pacmanX: number;
  pacmanY: number;
  ghostX: number;
  ghostY: number;
  contactThreshold: number;
}) => {
  const { pacmanX, pacmanY, ghostX, ghostY, contactThreshold } = options;

  return (
    (Math.abs(ghostX - pacmanX) <= contactThreshold && ghostY === pacmanY) ||
    (Math.abs(ghostY - pacmanY) <= contactThreshold && ghostX === pacmanX)
  );
};
