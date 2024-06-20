import { deleteAllUsers } from "./controllers/authcontrollers.js";

async function deleteUsers() {
    await deleteAllUsers()
}

deleteUsers()