import jsPDF from "jspdf"
import {autoTable} from 'jspdf-autotable' // eslint-disable-line 


export const exportPDF = (headersData, data, fileName) => {
  const unit = "pt"
  const size = "A4" // Use A1, A2, A3 or A4
  const orientation = "portrait" // portrait or landscape
  const title = fileName;
  const headers = [headersData]
  const pdfData = data
  const marginLeft = 40
  const doc = new jsPDF(orientation, unit, size)
  let content = {
    startY: 50,
    head: headers,
    body: pdfData,
  }

  doc.setFontSize(15)
  doc.text(title, marginLeft, 40)
  doc.autoTable(content)
  doc.save(fileName + ".pdf")
}