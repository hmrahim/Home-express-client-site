import React from "react";

const WebsiteDescription = () => {
  return (
    <section
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        background: "#f9f9f9",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontSize: "26px", marginBottom: "10px" }}>
        Welcome to ShopEase
      </h2>

      <p style={{ fontSize: "16px", color: "#555", lineHeight: "1.6" }}>
        ShopEase একটি আধুনিক ও বিশ্বাসযোগ্য e-commerce প্ল্যাটফর্ম যেখানে আপনি
        পাবেন উচ্চমানের পণ্য, সাশ্রয়ী মূল্য এবং দ্রুত ডেলিভারি। আমাদের লক্ষ্য
        হলো সহজ, নিরাপদ এবং আরামদায়ক অনলাইন শপিং অভিজ্ঞতা দেওয়া।
      </p>
    </section>
  );
};

export default WebsiteDescription;
