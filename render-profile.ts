
import { loadCurrentUser } from "./user-utils.js";
import { gardent_init } from "./my-garden.js";
import { renderGrid } from "./my-garden.js";

function render_profile_init() {
  const result = loadCurrentUser();
  if (!result) return;

  const user = result.user;
  gardent_init(user);
  renderGrid(user);

}

export {
  render_profile_init
}
