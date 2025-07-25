import { loadNeighbor } from "../user_logic/user-utils.js";
import { renderNeighborGrid } from "../garden/neighbor-garden.js";


function render_neighbor_init() {
  const result = loadNeighbor();
  if (!result) return;

  const neighbor = result.user;

  renderNeighborGrid(neighbor);

}

export {
    render_neighbor_init
}