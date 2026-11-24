import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Upload,
  Check,
  X,
  UserRound,
  ShieldCheck,
  CreditCard,
} from "lucide-react";

import Logo from "../components/Logo";
import { useLanguage } from "../context/LanguageContext";

import "../styles/priestDocuments.css";

function PriestDocuments() {
  const navigate = useNavigate();
  const location = useLocation();

  const { t } = useLanguage();

  const previousData = location.state?.priestData || {};
  const mobile = location.state?.mobile || previousData.mobile || "";

  const [documents, setDocuments] = useState({
    governmentId: null,
    qualificationCertificate: null,
    addressProof: null,
    profilePhoto: null,
  });

  const [declaration, setDeclaration] = useState(false);
  const [errors, setErrors] = useState({});

  const documentTypes = [
    {
      key: "governmentId",
      title: "Government ID",
      description:
        "Aadhaar Card, Passport, Driving Licence or other valid government ID",
      icon: <CreditCard size={21} />,
      required: true,
    },
    {
      key: "qualificationCertificate",
      title: "Vedic / Religious Certificate",
      description:
        "Certificate or document supporting your religious or Vedic qualification",
      icon: <FileText size={21} />,
      required: true,
    },
    {
      key: "addressProof",
      title: "Address Proof",
      description:
        "A valid document confirming your current address",
      icon: <ShieldCheck size={21} />,
      required: true,
    },
    {
      key: "profilePhoto",
      title: "Profile Photo",
      description:
        "A clear recent photograph of yourself",
      icon: <UserRound size={21} />,
      required: true,
    },
  ];

  const handleFileChange = (key, file) => {
    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        [key]:
          "Only PDF, JPG, PNG or WEBP files are allowed.",
      }));

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        [key]:
          "File size should not exceed 5 MB.",
      }));

      return;
    }

    setDocuments((prev) => ({
      ...prev,
      [key]: file,
    }));

    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  const removeFile = (key) => {
    setDocuments((prev) => ({
      ...prev,
      [key]: null,
    }));
  };

  const validate = () => {
    const newErrors = {};

    documentTypes.forEach((document) => {
      if (
        document.required &&
        !documents[document.key]
      ) {
        newErrors[document.key] =
          "This document is required.";
      }
    });

    if (!declaration) {
      newErrors.declaration =
        "Please accept the declaration before submitting.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const applicationData = {
      ...previousData,
      documents: {
        governmentId: documents.governmentId?.name || "",
        qualificationCertificate:
          documents.qualificationCertificate?.name || "",
        addressProof:
          documents.addressProof?.name || "",
        profilePhoto:
          documents.profilePhoto?.name || "",
      },
      declarationAccepted: true,
    };

    navigate("/priest-verification", {
      state: {
        mobile,
        priestData: applicationData,
        applicationSubmitted: true,
      },
    });
  };

  const handleBack = () => {
    navigate("/priest-service-location", {
      state: {
        mobile,
        priestData: previousData,
      },
    });
  };

  return (
    <div className="priest-documents-page">

      <div className="priest-documents-container">

        {/* Header */}
        <header className="priest-documents-header">

          <button
            type="button"
            className="documents-back-button"
            onClick={handleBack}
          >
            <ArrowLeft size={20} />
          </button>

          <Logo className="documents-logo" />
          <div className="documents-header-spacer"></div>

        </header>

        {/* Progress */}
<div className="documents-progress">

  {/* STEP 1 */}
  <div className="documents-progress-step completed">
    <span>✓</span>
    <p>{t("priest.basicDetails")}</p>
  </div>

  <div className="documents-progress-line active"></div>

  {/* STEP 2 */}
  <div className="documents-progress-step completed">
    <span>✓</span>
    <p>{t("priest.professional")}</p>
  </div>

  <div className="documents-progress-line active"></div>

  {/* STEP 3 */}
  <div className="documents-progress-step completed">
    <span>✓</span>
    <p>{t("priest.languages")}</p>
  </div>

  <div className="documents-progress-line active"></div>

  {/* STEP 4 */}
  <div className="documents-progress-step completed">
    <span>✓</span>
    <p>{t("priest.location")}</p>
  </div>

  <div className="documents-progress-line active"></div>

  {/* STEP 5 */}
  <div className="documents-progress-step active">
    <span>5</span>
    <p>{t("priest.documents")}</p>
  </div>

</div>
        {/* Main Card */}
        <main className="priest-documents-card">

          {/* Title */}
          <div className="documents-title">

            <div className="documents-icon">
              <FileText size={24} />
            </div>

            <div>
              <h1>
                {t("priest.documents")}
              </h1>

              <p>
                Upload the documents required for verification
              </p>
            </div>

          </div>

          {/* Information */}
          <div className="documents-info">

            <ShieldCheck size={19} />

            <p>
              Your documents will be securely reviewed by the
              PoojaMitra verification team. Each file must be
              less than 5 MB.
            </p>

          </div>

          {/* Document Cards */}
          <section className="documents-list">

            {documentTypes.map((document) => {

              const file =
                documents[document.key];

              return (
                <div
                  key={document.key}
                  className={`document-item ${
                    file ? "uploaded" : ""
                  }`}
                >

                  <div className="document-item-header">

                    <div className="document-item-icon">
                      {document.icon}
                    </div>

                    <div className="document-item-content">

                      <div className="document-name-row">

                        <h2>
                          {document.title}
                        </h2>

                        {document.required && (
                          <span className="required-badge">
                            Required
                          </span>
                        )}

                      </div>

                      <p>
                        {document.description}
                      </p>

                    </div>

                  </div>

                  {!file ? (
                    <label className="upload-area">

                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.webp"
                        onChange={(e) =>
                          handleFileChange(
                            document.key,
                            e.target.files?.[0]
                          )
                        }
                      />

                      <Upload size={20} />

                      <div>
                        <strong>
                          Click to upload
                        </strong>

                        <span>
                          PDF, JPG, PNG or WEBP
                        </span>
                      </div>

                    </label>
                  ) : (
                    <div className="uploaded-file">

                      <div className="uploaded-file-icon">
                        <Check size={17} />
                      </div>

                      <div className="uploaded-file-info">

                        <strong>
                          {file.name}
                        </strong>

                        <span>
                          {(file.size / 1024 / 1024).toFixed(2)}
                          {" "}MB
                        </span>

                      </div>

                      <button
                        type="button"
                        className="remove-file-button"
                        onClick={() =>
                          removeFile(document.key)
                        }
                      >
                        <X size={17} />
                      </button>

                    </div>
                  )}

                  {errors[document.key] && (
                    <p className="document-error">
                      {errors[document.key]}
                    </p>
                  )}

                </div>
              );
            })}

          </section>

          {/* Declaration */}
          <section className="declaration-section">

            <button
              type="button"
              className={`declaration-box ${
                declaration ? "accepted" : ""
              }`}
              onClick={() =>
                setDeclaration(!declaration)
              }
            >

              <span className="declaration-check">
                {declaration && (
                  <Check size={15} />
                )}
              </span>

              <span className="declaration-text">
                I confirm that the information and documents
                provided by me are genuine and accurate. I
                understand that PoojaMitra may verify these
                details before approving my priest account.
              </span>

            </button>

            {errors.declaration && (
              <p className="document-error">
                {errors.declaration}
              </p>
            )}

          </section>

          {/* Actions */}
          <div className="documents-actions">

            <button
              type="button"
              className="documents-secondary-button"
              onClick={handleBack}
            >
              <ArrowLeft size={18} />
              {t("common.back")}
            </button>

            <button
              type="button"
              className="documents-primary-button"
              onClick={handleSubmit}
            >
              Submit Application
              <ArrowRight size={18} />
            </button>

          </div>

          {/* Footer */}
          <div className="documents-footer">

            <span>🔒</span>

            <p>
              Your documents are used only for verification
              purposes and are handled securely.
            </p>

          </div>

        </main>

      </div>

    </div>
  );
}

export default PriestDocuments;