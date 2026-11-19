import { describe, expect, it } from "vitest";
import { filterProjects } from "@/lib/portfolio";
import { createConsultationLink } from "@/lib/contact";
describe("Portfolio filters", () => {
  it("shows the three reference homes for Viviendas", () => {
    expect(filterProjects("Viviendas").map((p) => p.name)).toEqual([
      "Casa Patio",
      "Casa Entre Árboles",
      "Casa Horizonte",
    ]);
  });
  it("shows only preliminary designs for Anteproyectos", () => {
    expect(filterProjects("Anteproyectos").map((p) => p.slug)).toEqual(["pabellon-natural"]);
  });
  it("shows only ongoing designs for En desarrollo", () => {
    expect(filterProjects("En desarrollo").map((p) => p.slug)).toEqual(["residencia-abierta"]);
  });
});
describe("Real contact destinations", () => {
  it("does not prepare a fake submission without a recipient", () => {
    expect(createConsultationLink("", { Nombre: "Ana" })).toBeNull();
  });
  it("prepares the provided real email with the consultation", () => {
    expect(createConsultationLink("estudio@example.com", { Nombre: "Ana" })).toBe(
      "mailto:estudio@example.com?subject=Consulta%20de%20proyecto%20%E2%80%94%20MA%20Arquitecta&body=Nombre%3A%20Ana",
    );
  });
});
