import { assertEquals } from "https://deno.land/std@0.200.0/testing/asserts.ts";
import { validate } from "https://deno.land/x/validasaur/mod.ts";
import { emailValidationRules } from "../controllers/registrationController.js"; 

Deno.test("emailValidationRules - Valid email passes", async () => {
  const [passes, _errors] = await validate({ email: "test@email.com" }, emailValidationRules);
  assertEquals(passes, true);
});

Deno.test("emailValidationRules - Invalid email fails", async () => {
    const [passes, errors] = await validate({ email: "invalid-email" }, emailValidationRules);
  
    assertEquals(passes, false);
    assertEquals("isEmail" in (errors.email || {}), true);
  });
  
