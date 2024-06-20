import { deleteAllOrderItems } from "./controllers/orderitemscontrollers.js";
import { deleteAllOrders } from "./controllers/orderscontrollers.js";

async function deleteOrders() {
    await deleteAllOrderItems()
    await deleteAllOrders()
}

deleteOrders()