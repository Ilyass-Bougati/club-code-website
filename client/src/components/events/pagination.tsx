"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
 
    if (totalPages <= 1) return null;

    const goToPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(page));
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex justify-center items-center gap-3 my-6">
           
            {currentPage > 1 && (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => goToPage(currentPage - 1)}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/80"
                >
                    <ChevronLeft className="w-4 h-4" /> Prev
                </motion.button>
            )}
            <AnimatePresence mode="wait">
                <motion.span
                    key={currentPage}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 py-2 rounded-lg bg-secondary text-white font-semibold shadow-md"
                >
                    {currentPage}
                </motion.span>
            </AnimatePresence>

            {(currentPage < totalPages || currentPage == 1)  && (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => goToPage(currentPage + 1)}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/80"
                >
                    Next <ChevronRight className="w-4 h-4" />
                </motion.button>
            )}
        </div>
    );
}
