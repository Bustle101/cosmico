import { Express } from "express";

import { issModule } from "./iss/module";
import { jwstModule } from "./jwst/module";
import { osdrModule } from "./osdr/module";
import { astroModule } from "./astro/module";

export function loadModules(app: Express) {
  app.use("/api/iss", issModule());
  app.use("/api/jwst", jwstModule());
  app.use("/api/osdr", osdrModule());
  app.use("/api/astro", astroModule());
}
