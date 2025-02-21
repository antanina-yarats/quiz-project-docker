import { assertEquals, assertNotEquals } from "../deps.js";

import * as userManager from "./mocks/userManagerMock.js"; // ✅ Use the correct mock

Deno.test("Register user with valid email and password", async () => {
    const userEmail = "test_user@mail.com";
    const password = "securePassword123";
    const result = await userManager.addUser(userEmail, password);
    assertEquals(result, 1);  
});

Deno.test("Register user with invalid email and valid password", async () => {
    const userEmail = "invalid-email";
    const password = "securePassword123";
    const result = await userManager.addUser(userEmail, password);
    assertEquals(result, 0);  
});

Deno.test("Register user with valid email but existing account", async () => {
    const userEmail = "existing_user@mail.com";
    const password = "securePassword123";
    
    await userManager.addUser(userEmail, password); 
    const result = await userManager.addUser(userEmail, password); 
    
    assertEquals(result, 0);  
});
