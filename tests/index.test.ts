import { superoak } from "https://deno.land/x/superoak@2.1.0/mod.ts";
import app from "../app.ts";

Deno.test("should return the right message", async () => {
  const req = await superoak(app);
  await req.get("/").expect({ "message": "Hello World!" });
});

Deno.test("should return an array", async () => {
  const req = await superoak(app);
  await req.get("/company")
    .expect(200)
    .expect([]);
});

Deno.test("should return an empty array", async () => {
  const req = await superoak(app);
  await req.get("/company")
    .expect(200)
    .expect([]);
});

Deno.test("should return an error if company does not exists", async () => {
  const req = await superoak(app);
  await req.get("/company/15d1dfe5-053e-4c3c-b3dc-91fabd1e214d")
    .expect(400)
    .expect({ message: "Company does not exists." });
});

Deno.test("should return an object when creating a new company", async () => {
  const req = await superoak(app);
  await req.post("/company")
    .send({
      name: "sample",
      address: "cebu",
      description: "ssss",
    })
    .expect(201)
    .expect({ created: true });
});

Deno.test("should return an error if trying to delete that does not exists", async () => {
  const req = await superoak(app);
  await req.delete("/company/15d1dfe5-053e-4c3c-b3dc-91fabd1e214d")
    .expect(400)
    .expect({ message: "Company does not exists." });
});
