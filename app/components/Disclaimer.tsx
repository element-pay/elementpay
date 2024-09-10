"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { BsExclamationOctagon } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { primaryBtnClasses, secondaryBtnClasses } from "./Styles";
import ElementLogo from "../../public/element_logo.svg";

export const Disclaimer = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    const hasAcceptedDisclaimer = localStorage.getItem("hasAcceptedDisclaimer");
    if (!hasAcceptedDisclaimer) {
      setShowDisclaimer(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("hasAcceptedDisclaimer", "true");
    setShowDisclaimer(false);
  };

  const handleClose = () => {
    window.history.back();
    toast.error("You must accept the disclaimer to proceed.");
  };

  return (
    <AnimatePresence>
      {showDisclaimer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 grid min-h-screen place-items-center gap-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid w-full max-w-[400px] gap-5 rounded-3xl bg-white p-6 shadow-xl dark:bg-black"
          >
            <div className="flex justify-center mb-4">
              <ElementLogo width={40} height={40} /> {/* Your logo component */}
            </div>
            <h2 className="text-2xl font-semibold text-center text-black dark:text-white">
              Element Disclaimer
            </h2>
            <p className="text-sm leading-relaxed text-center text-neutral-900 dark:text-white/80">
              This app is a demo version for Element. Transactions are real but
              used for demonstration purposes only. Please proceed with
              caution.
            </p>
            <p className="text-sm leading-relaxed text-center text-neutral-900 dark:text-white/80">
              Use this app responsibly. Element and its developers are not liable
              for any damages or losses incurred from its use.
            </p>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleClose}
                className={`${secondaryBtnClasses} text-dark bg-transparent border-2 border-[#1A1B1F] hover:bg-[#1A1B1F] hover:text-white dark:text-white dark:border-[#F0B429] dark:hover:bg-[#F0B429] dark:hover:text-[#1A1B1F]`}
              >
                Decline
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className={`${primaryBtnClasses} bg-[#1A1B1F] text-[#F0B429] hover:bg-[#F0B429] hover:text-[#1A1B1F] dark:bg-[#F0B429] dark:text-[#1A1B1F] dark:hover:bg-[#1A1B1F] dark:hover:text-[#F0B429]`}
              >
                I Understand
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
