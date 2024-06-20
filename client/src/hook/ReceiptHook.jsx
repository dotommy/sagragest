import { readProductbyId } from "./ProductsHook";
import { jsPDF } from 'jspdf';
export async function generatePDF(props) {
    const data = props[0]
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text("Dettagli dell'Ordine", 10, 20);

    // Linea di separazione
    doc.setLineWidth(0.5);
    doc.line(10, 25, 200, 25);

    // Informazioni dell'ordine
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text(`ID Ordine: ${data.id}`, 10, 35);
    doc.text(`Nome Cliente: ${data.customerName}`, 10, 45);
    const orderDate = new Date(data.orderDate).toLocaleString();
    doc.text(`Data Ordine: ${orderDate}`, 10, 55);
    doc.text(`Totale Ordine: €${data.ordertotal}`, 10, 65);

    // Linea di separazione
    doc.line(10, 75, 200, 75);

    // Articoli dell'ordine
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text("Articoli:", 10, 85);

    // Header della tabella
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text("Quantità", 10, 95);
    doc.text("Prodotto", 50, 95);
    doc.text("Prezzo", 150, 95);

    // Linea di separazione
    doc.line(10, 97, 200, 97);

    // Dettagli degli articoli
    doc.setFont(undefined, 'normal');
    for (const [index, item] of data.OrderItems.entries()) {
        const product = await readProductbyId(item.productId);
        const yPosition = 105 + (index * 10);
        doc.text(`${item.quantity}`, 10, yPosition);
        doc.text(`${product[0].name}`, 50, yPosition);
        doc.text(`€${product[0].price}`, 150, yPosition);
    }
    
    doc.output('dataurlnewwindow');
}