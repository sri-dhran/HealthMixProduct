import { defineRailway, github, project, service } from "railway/iac";

export default defineRailway(() => {
  const web = service("web", {
    source: github("sri-dhran/HealthMixProduct"),
    build: "npm run build",
  });

  return project("HealthMixProduct", {
    resources: [web],
  });
});
