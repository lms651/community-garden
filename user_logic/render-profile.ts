
import { loadCurrentUser } from "./user-utils.js";
import { garden_init } from "../garden/my-garden.js";
import { renderGrid } from "../garden/my-garden.js";

function render_profile_init() {
  const result = loadCurrentUser();
  if (!result) return;

  const user = result.user;
  garden_init(user);
  renderGrid(user);

  document.getElementById("test-neighbor")?.addEventListener("click", () => {
  window.location.href = "neighbor.html";
});

}

export {
  render_profile_init
}
