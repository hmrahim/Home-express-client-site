import React from "react";
import { useParams } from "react-router-dom";
import { getQuotationById } from "../../../api/AllApi";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

import QuotationPDF from "./InvoicePdf";

export default function QuotationInvoice() {
  const invoiceRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: "Quotation Invoice",
  });
  const { id } = useParams();
  const {
    data: quotation,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["quotation", id],
    queryFn: () => getQuotationById(id),
  });

  console.log(quotation);
  const totalAmount = quotation?.products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0,
  );

  // const styles = StyleSheet.create({
  //   page: {
  //     padding: 30,
  //     fontSize: 12,
  //   },

  //   header: {
  //     flexDirection: "row",
  //     justifyContent: "space-between",
  //     marginBottom: 20,
  //   },

  //   title: {
  //     fontSize: 18,
  //     fontWeight: "bold",
  //   },

  //   company: {
  //     fontSize: 16,
  //     fontWeight: "bold",
  //   },

  //   section: {
  //     marginBottom: 15,
  //   },

  //   table: {
  //     display: "table",
  //     width: "100%",
  //     borderStyle: "solid",
  //     borderWidth: 1,
  //   },

  //   tableRow: {
  //     flexDirection: "row",
  //   },

  //   tableColHeader: {
  //     width: "25%",
  //     borderStyle: "solid",
  //     borderWidth: 1,
  //     backgroundColor: "#f3f3f3",
  //     padding: 5,
  //   },

  //   tableCol: {
  //     width: "25%",
  //     borderStyle: "solid",
  //     borderWidth: 1,
  //     padding: 5,
  //   },

  //   total: {
  //     marginTop: 20,
  //     textAlign: "right",
  //     fontSize: 14,
  //     fontWeight: "bold",
  //   },
  // });

  // const InvoicePDF = ({ quotation, totalAmount }) => (
  //   <Document>
  //     <Page size="A4" style={styles.page}>
  //       {/* Header */}
  //       <View style={styles.header}>
  //         <View>
  //           <Text style={styles.title}>Quotation Invoice</Text>
  //           <Text>Date: {new Date().toLocaleDateString()}</Text>
  //         </View>

  //         <View>
  //           <Text style={styles.company}>MOOM24</Text>
  //           <Text>Address: AL Malaz</Text>
  //           <Text>Riyadh, Saudi Arabia</Text>
  //         </View>
  //       </View>

  //       {/* Customer Info */}
  //       <View style={styles.section}>
  //         <Text>Customer: {quotation?.company}</Text>
  //         <Text>Email: {quotation?.email}</Text>
  //         <Text>Vat Number: {quotation?.vatNo}</Text>
  //         <Text>Phone: {quotation?.phone}</Text>
  //         <Text>Address: {quotation?.address}</Text>
  //       </View>

  //       {/* Table */}
  //       <View style={styles.table}>
  //         {/* Table Header */}
  //         <View style={styles.tableRow}>
  //           <Text style={styles.tableColHeader}>Product</Text>
  //           <Text style={styles.tableColHeader}>Quantity</Text>
  //           <Text style={styles.tableColHeader}>Price</Text>
  //           <Text style={styles.tableColHeader}>Total</Text>
  //         </View>

  //         {/* Table Rows */}
  //         {quotation?.products?.map((p, i) => (
  //           <View style={styles.tableRow} key={i}>
  //             <Text style={styles.tableCol}>{p?.name}</Text>

  //             <Text style={styles.tableCol}>{p?.quantity}</Text>

  //             <Text style={styles.tableCol}>
  //               {p?.status === "approved" ? p?.price : "pending"}
  //             </Text>

  //             <Text style={styles.tableCol}>
  //               {p?.status === "approved" ? p?.quantity * p?.price : "pending"}
  //             </Text>
  //           </View>
  //         ))}
  //       </View>

  //       {/* Total */}
  //       <Text style={styles.total}>Total: {totalAmount}</Text>
  //     </Page>
  //   </Document>
  // );

  return (
    <div className="relative">
      <div className="bg-gray-100 min-h-screen  font-sans ">
        <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg text-gray-700">
          {/* Header */}
          <div className="flex justify-between border-b pb-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold">MOOM24</h2>
              <p className="text-sm">Riyadh, Saudi Arabia</p>
              <p className="text-sm">Email: info@moom24.com</p>
              <p className="text-sm">Phone: +966 570 544 254</p>
            </div>

            <div className="text-right">
              <h2 className="text-3xl font-bold text-blue-700">QUOTATION</h2>

              <p className="text-sm mt-2">
                <span className="font-semibold">Quotation No:</span> #QT-001
              </p>

              <p className="text-sm">
                <span className="font-semibold">Date:</span> 26 Feb 2026
              </p>

              <p className="text-sm">
                <span className="font-semibold">Valid Until:</span> 10 Mar 2026
              </p>

              <p className="text-sm">
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`${quotation?.status === "Approved" ? "text-green-600 " : "text-yellow-600 "} font-semibold`}
                >
                  {quotation?.status === "Approved"
                    ? "Approved"
                    : "Waiting Approval"}
                </span>
              </p>
            </div>
          </div>

          {/* Client */}
          <div className="flex justify-between mb-8">
            <div>
              <h4 className="font-semibold mb-1">Quotation For:</h4>
              <p className="text-sm">{quotation?.company}</p>
              <p className="text-sm">Vat No: {quotation?.vatNo}</p>
              <p className="text-sm">{quotation?.address}</p>
              <p className="text-sm">Phone: +966 {quotation?.phone}</p>
              <p className="text-sm">Email: {quotation?.email}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-1">Prepared By:</h4>
              <p className="text-sm">Sales Manager</p>
              <p className="text-sm">Moom24</p>
              <p className="text-sm">VAT: 123456789</p>
            </div>
          </div>

          {/* Table Header */}
          <div className="flex bg-slate-800 text-white text-sm font-semibold py-3">
            <div className="flex-[4] pl-3">Item</div>
            <div className="flex-[2] text-center">Qty</div>
            <div className="flex-[2] text-center">Size</div>
            <div className="flex-[2] text-center">Color</div>
            <div className="flex-[3] text-center">Unit Price</div>
            <div className="flex-[3] text-right pr-3">Total</div>
          </div>

          {/* Item */}
          {quotation?.products?.map((product) => {
            return (
              <div className="flex border-b text-sm py-3">
                <div className="flex-[4] pl-3">{product?.name}</div>
                <div className="flex-[2] text-center">{product?.quantity}</div>
                <div className="flex-[2] text-center">{product?.size}</div>
                <div className="flex-[2] text-center">{product?.color}</div>
                <div className="flex-[3] text-center">
                  {product?.price ? product?.price : "Pending"}{" "}
                  {product?.price ? "SAR" : ""}{" "}
                </div>
                <div className="flex-[3] text-right pr-3">
                  {product?.price
                    ? product?.price * product?.quantity
                    : "Pending"}{" "}
                  {product?.price ? "SAR" : ""}{" "}
                </div>
              </div>
            );
          })}

          {/* Total */}
          <div className="flex mt-8">
            <div className="flex-1"></div>

            <div className="w-72 text-sm">
              <div className="flex justify-between py-1">
                <span>Subtotal</span>
                <span>
                  {totalAmount ? totalAmount : "pending"}{" "}
                  {totalAmount ? "SAR" : ""}
                </span>
              </div>

              <div className="flex justify-between py-1">
                <span>VAT (15%)</span>
                <span>
                  {totalAmount ? (totalAmount * 15) / 100 : "pending"}{" "}
                  {totalAmount ? "SAR" : ""}
                </span>
              </div>

              <div className="flex justify-between border-t-2 border-black mt-2 pt-2 text-lg font-bold">
                <span>Total Quotation</span>
                <span>
                  {totalAmount ? totalAmount : "pending"}{" "}
                  {totalAmount ? "SAR" : ""}
                </span>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="mt-10">
            <h4 className="font-semibold mb-2">Terms & Conditions</h4>

            <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
              <li>This quotation is valid for 15 days.</li>
              <li>Delivery timeline will be confirmed after approval.</li>
              <li>Payment terms: 50% advance.</li>
              <li>Prices include VAT unless stated otherwise.</li>
            </ul>
          </div>

          {/* Signature */}
          <div className="flex justify-between mt-16 text-sm">
            <div>
              <p className="border-t pt-2 w-40 text-center">
                Authorized Signature
              </p>
            </div>

            <div>
              <p className="border-t pt-2 w-40 text-center">Client Approval</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-10 border-t pt-4 text-center text-xs text-gray-500">
            This is a computer generated quotation.
          </div>
        </div>
       
      </div>
       <div className="absolute  top-[310px]  right-8 fixed z-10">
          <PDFDownloadLink
            document={
              <QuotationPDF quotation={quotation} totalAmount={totalAmount} />
            }
            fileName="quotation.pdf"
          >
            {({ loading }) =>
              loading ? (
                "Generating..."
              ) : (
       <button className="group relative inline-flex items-center gap-3 px-7 py-3 text-sm font-semibold text-white rounded-xl overflow-hidden">

  {/* Gradient Border Animation */}
  <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 animate-[spin_5s_linear_infinite]"></span>

  {/* Inner Background */}
  <span className="absolute inset-[2px] bg-gray-900 rounded-xl"></span>

  {/* Glow */}
  <span className="absolute inset-0 blur-xl opacity-40 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 group-hover:opacity-70 transition"></span>

  {/* Content */}
  <span className="relative flex items-center gap-2">

    {/* Icon */}
    <svg
      className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v10m0 0l-4-4m4 4l4-4M5 19h14"/>
    </svg>

    {/* Animated Text */}
    <span className="bg-gradient-to-r from-blue-400 via-white to-purple-400 bg-[length:200%_100%] 
    bg-clip-text text-transparent 
    animate-[shine_3s_linear_infinite] 
    group-hover:tracking-wider transition-all duration-300">
      Download PDF
    </span>

  </span>
</button>


              )
            }
          </PDFDownloadLink>
        </div>
    </div>
  );
}
