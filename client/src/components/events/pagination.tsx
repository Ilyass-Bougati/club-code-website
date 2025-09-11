"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  maxVisible?: number; 
}

export default function Pagination({ currentPage, totalPages, maxVisible = 3 }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`/events?${params.toString()}`);
  };


  const startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  const endPage = Math.min(totalPages, startPage + maxVisible - 1);

  const visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="flex justify-center items-center gap-2 my-6 flex-wrap">
     
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
        className={`flex items-center gap-1 px-4 py-2 rounded-lg transition ${
          currentPage === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-primary text-white hover:bg-primary/80"
        }`}
      >
        <ChevronLeft className="w-4 h-4" /> Prev
      </motion.button>

      
      <AnimatePresence initial={false}>
        {visiblePages.map((page) => (
          <motion.button
            key={page}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => goToPage(page)}
            className={`px-4 py-2 rounded-lg transition font-medium ${
              page === currentPage
                ? "bg-secondary text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {page}
          </motion.button>
        ))}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
        className={`flex items-center gap-1 px-4 py-2 rounded-lg transition ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-primary text-white hover:bg-primary/80"
        }`}
      >
        Next <ChevronRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
}
