import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica"
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: 1,
    paddingBottom: 12,
    marginBottom: 20
  },

  logo: {
    width: 90
  },

  companyInfo: {
    marginTop: 5
  },

  rightHeader: {
    textAlign: "right"
  },

  quotationTitle: {
    fontSize: 24,
    color: "#1d4ed8",
    fontWeight: "bold"
  },

  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#0f172a",
    color: "white",
    paddingVertical: 7,
    fontSize: 10
  },

  row: {
    flexDirection: "row",
    borderBottom: 1,
    paddingVertical: 7
  },

  colItem: { flex: 4, paddingLeft: 5 },
  colQty: { flex: 2, textAlign: "center" },
  colSize: { flex: 2, textAlign: "center" },
  colColor: { flex: 2, textAlign: "center" },
  colPrice: { flex: 3, textAlign: "center" },
  colTotal: { flex: 3, textAlign: "right", paddingRight: 5 },

  totals: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "flex-end"
  },

  totalsBox: {
    width: 220
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4
  },

  grandTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTop: 2,
    paddingTop: 6,
    fontSize: 13,
    fontWeight: "bold"
  },

  terms: {
    marginTop: 40,
    fontSize: 10
  },

  signatureSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 70
  },

  signature: {
    width: 150,
    borderTop: 1,
    textAlign: "center",
    paddingTop: 5
  },

  footer: {
    marginTop: 40,
    borderTop: 1,
    paddingTop: 10,
    textAlign: "center",
    fontSize: 9,
    color: "gray"
  }
});

const QuotationPDF = ({ quotation, totalAmount }) => {

  const vat = totalAmount ? totalAmount * 0.15 : 0;
  const grandTotal = totalAmount ? totalAmount + vat : 0;

  const quotationNo = `QT-${Date.now().toString().slice(-5)}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* Header */}
        <View style={styles.header}>

          <View>
            {/* Logo */}
            <Image
              style={styles.logo}
              src="https://i.imgur.com/YOURLOGO.png"
            />

            <View style={styles.companyInfo}>
              <Text>MOOM24</Text>
              <Text>Riyadh, Saudi Arabia</Text>
              <Text>Email: info@moom24.com</Text>
              <Text>Phone: +966 570 544 254</Text>
            </View>
          </View>

          <View style={styles.rightHeader}>
            <Text style={styles.quotationTitle}>QUOTATION</Text>

            <Text>Quotation No: {quotationNo}</Text>
            <Text>Date: {new Date().toLocaleDateString()}</Text>

            <Text>
              Valid Until:{" "}
              {new Date(Date.now() + 15 * 86400000).toLocaleDateString()}
            </Text>

            <Text>  Status: {quotation?.status === "Approved" ?  "Approved" : "Waiting Approval"} </Text>
          </View>

        </View>

        {/* Client */}
        <View style={styles.section}>

          <View>
            <Text>Quotation For:</Text>
            <Text>{quotation?.company}</Text>
            <Text>VAT: {quotation?.vatNo}</Text>
            <Text>{quotation?.address}</Text>
            <Text>Phone: +966 {quotation?.phone}</Text>
            <Text>Email: {quotation?.email}</Text>
          </View>

          <View>
            <Text>Prepared By:</Text>
            <Text>Sales Manager</Text>
            <Text>Moom24</Text>
            <Text>VAT: 123456789</Text>
          </View>

        </View>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.colItem}>Item</Text>
          <Text style={styles.colQty}>Qty</Text>
          <Text style={styles.colSize}>Size</Text>
          <Text style={styles.colColor}>Color</Text>
          <Text style={styles.colPrice}>Unit Price</Text>
          <Text style={styles.colTotal}>Total</Text>
        </View>

        {/* Products */}
        {quotation?.products?.map((p, i) => {

          const price = p?.price;
          const total = price ? price * p.quantity : null;

          return (
            <View style={styles.row} key={i}>

              <Text style={styles.colItem}>{p?.name}</Text>
              <Text style={styles.colQty}>{p?.quantity}</Text>
              <Text style={styles.colSize}>{p?.size}</Text>
              <Text style={styles.colColor}>{p?.color}</Text>

              <Text style={styles.colPrice}>
                {price ? `${price} SAR` : "Pending"}
              </Text>

              <Text style={styles.colTotal}>
                {price ? `${total} SAR` : "Pending"}
              </Text>

            </View>
          );
        })}

        {/* Totals */}
        <View style={styles.totals}>
          <View style={styles.totalsBox}>

            <View style={styles.totalRow}>
              <Text>Subtotal</Text>
              <Text>{totalAmount ? `${totalAmount} SAR` : "Pending"}</Text>
            </View>

            <View style={styles.totalRow}>
              <Text>VAT (15%)</Text>
              <Text>{totalAmount ? `${vat} SAR` : "Pending"}</Text>
            </View>

            <View style={styles.grandTotal}>
              <Text>Total (VAT Included)</Text>
              <Text>{totalAmount ? `${grandTotal} SAR` : "Pending"}</Text>
            </View>

          </View>
        </View>

        {/* Terms */}
        <View style={styles.terms}>
          <Text>Terms & Conditions</Text>

          <Text>- This quotation is valid for 15 days.</Text>
          <Text>- Delivery timeline will be confirmed after approval.</Text>
          <Text>- Payment terms: 50% advance.</Text>
          <Text>- Prices include VAT unless stated otherwise.</Text>
        </View>

        {/* Signatures */}
        <View style={styles.signatureSection}>
          <Text style={styles.signature}>Authorized Signature</Text>
          <Text style={styles.signature}>Client Approval</Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          This is a computer generated quotation from MOOM24.
        </Text>

      </Page>
    </Document>
  );
};

export default QuotationPDF;