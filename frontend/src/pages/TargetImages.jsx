import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import "../legacy-styles/business-portal.css";

export default function TargetImages() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Hard-coded list of target images - modify this array to add/remove images
  const TARGET_IMAGES = [
    { id: 1, imageUrl: "/target-images/tanami-target-image.jpg" },
    { id: 2, imageUrl: "/target-images/target-QR-code.png" },
    { id: 3, imageUrl: "/target-images/PWC WebAR target image blue.png" },
    { id: 4, imageUrl: "/target-images/PWC WebAR target image red.png" },
    { id: 5, imageUrl: "/target-images/PWC WebAR target image black.png" }
  ];

  function downloadImage(imageUrl, imageId) {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `target-image-${imageId}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function openImageModal(image) {
    setSelectedImage(image);
  }

  function closeModal() {
    setSelectedImage(null);
  }

  return (
    <>
      <Navbar />
      <main className="container">
        <div className="page">
          <div className="content-area" style={{ width: "100%", maxWidth: "100%" }}>
            <div style={{ marginBottom: "24px" }}>
              <h2>Target Images</h2>
              <p className="muted" style={{ margin: "8px 0 0" }}>
                View and download target images used for AR tracking in the 8th Wall experience
              </p>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "20px",
              marginTop: "20px"
            }}>
              {TARGET_IMAGES.map((image) => (
                <div
                  key={image.id}
                  style={{
                    background: "var(--glass)",
                    border: "1px solid var(--stroke)",
                    borderRadius: "var(--r)",
                    overflow: "hidden",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    onClick={() => openImageModal(image)}
                    style={{
                      width: "100%",
                      height: "280px",
                      overflow: "hidden",
                      background: "rgba(0, 0, 0, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <img
                      src={image.imageUrl}
                      alt={`Target ${image.id}`}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain"
                      }}
                      onError={(e) => {
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23333'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23666' font-size='14'%3EImage Not Found%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>

                  <div style={{ padding: "16px" }}>
                    <button
                      className="btn btn-primary"
                      style={{ width: "100%" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadImage(image.imageUrl, image.id);
                      }}
                    >
                      <i className="fa-solid fa-download" style={{ marginRight: "8px" }}></i>
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {TARGET_IMAGES.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <div style={{
                  fontSize: "48px",
                  color: "var(--muted)",
                  marginBottom: "16px"
                }}>
                  <i className="fa-solid fa-image"></i>
                </div>
                <p className="muted">No target images available</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {selectedImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
            cursor: "pointer"
          }}
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#fff",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
            }}
          >
            <i className="fa-solid fa-times"></i>
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px"
            }}
          >
            <img
              src={selectedImage.imageUrl}
              alt={`Target ${selectedImage.id}`}
              style={{
                maxWidth: "100%",
                maxHeight: "calc(90vh - 100px)",
                objectFit: "contain",
                borderRadius: "8px",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)"
              }}
            />
            <button
              className="btn btn-primary btn-lg"
              onClick={() => downloadImage(selectedImage.imageUrl, selectedImage.id)}
            >
              <i className="fa-solid fa-download" style={{ marginRight: "8px" }}></i>
              Download Full Size
            </button>
          </div>
        </div>
      )}
    </>
  );
}