import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimesCircle, FaTimes } from "react-icons/fa";
import { useToast } from "../context/ToastContext";

export const Toast = ({ id, message, type, onRemove }) => {
  const icons = {
    success: <FaCheckCircle className="text-success" size={20} />,
    error: <FaTimesCircle className="text-danger" size={20} />,
    info: <FaInfoCircle className="text-primary" size={20} />,
    warning: <FaExclamationCircle className="text-warning" size={20} />,
  };

  const bgColors = {
    success: "bg-success/10 border-success/20",
    error: "bg-danger/10 border-danger/20",
    info: "bg-primary/10 border-primary/20",
    warning: "bg-warning/10 border-warning/20",
  };

  const textColors = {
    success: "text-success",
    error: "text-danger",
    info: "text-primary",
    warning: "text-warning",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: 100 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: -20, x: 100 }}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${bgColors[type]} ${textColors[type]} shadow-soft`}
    >
      {icons[type]}
      <span className="flex-1 font-medium text-sm">{message}</span>
      <button onClick={() => onRemove(id)} className="text-current hover:opacity-70">
        <FaTimes size={16} />
      </button>
    </motion.div>
  );
};

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-20 right-4 z-40 space-y-2 max-w-sm">
      <AnimatePresence mode="wait">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
            onRemove={removeToast}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
