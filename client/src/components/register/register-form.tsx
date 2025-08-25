"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const areaOfInterestSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(2).max(50),
});

const schema = z.object({
    id: z.string().uuid().optional(),
    firstName: z
        .string()
        .min(2, { message: "First name must be at least 2 characters" })
        .max(30, { message: "First name cannot exceed 30 characters" }),
    lastName: z
        .string()
        .min(2, { message: "Last name must be at least 2 characters" })
        .max(30, { message: "Last name cannot exceed 30 characters" }),
    email: z
        .string()
        .email({ message: "Please enter a valid email address" }),
    phoneNumber: z
        .string()
        .regex(/^\+?[0-9]{7,15}$/, { message: "Enter a valid phone number with country code" }),
    year: z
        .number()
        .min(1, { message: "Year must be at least 1" })
        .max(8, { message: "Year cannot be more than 8" }),
    major: z
        .string()
        .min(2, { message: "Major must be at least 2 characters" })
        .max(100, { message: "Major cannot exceed 100 characters" }),
    areaOfInterest: z
        .array(areaOfInterestSchema)
        .nonempty({ message: "Select at least one area of interest" }),
});


type FormFields = z.infer<typeof schema>;

const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const RegisterForm = () => {
    const form = useForm<FormFields>({
        resolver: zodResolver(schema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            year: 1,
            major: "",
            areaOfInterest: [],
        },
    });

    const onSubmit = (values: FormFields) => {
        console.log(values);
    };

    return (
        <div className="container mt-10 px-4 mb-20">
            {/* Header */}
            <div className="flex flex-col items-center mb-12 text-center">
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={container}
                    className="space-y-4"
                >
                    <motion.div variants={item}>
                        <Badge className="rounded-full px-4 py-1.5 text-sm font-medium shadow-sm" variant="secondary">
                            <span className="text-primary mr-1">✦</span> Register
                        </Badge>
                    </motion.div>

                    <motion.h2
                        variants={item}
                        className="from-foreground to-foreground/80 bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl"
                    >
                        Fill this form if you wanna join CODE
                    </motion.h2>

                    <motion.p variants={item} className="max-w-[800px] text-muted-foreground md:text-lg leading-relaxed">
                        <span className="font-medium text-foreground font-serif">Code</span> is a student-driven club{" "}
                        <span className="font-medium text-foreground">
                            focused on skill-building, collaboration, and real-world projects.
                        </span>
                    </motion.p>
                </motion.div>
            </div>

            {/* Form */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                <Image src="/form.svg" alt="student" width={400} height={500} className="hidden md:block" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-2xl"
                >
                    <Card className="shadow-lg rounded-2xl">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold">Join CODE</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    {/* First Name / Last Name */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="firstName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>First Name</FormLabel>
                                                    <FormControl>
                                                        <Input className="border-secondary" placeholder="Enter your first name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="lastName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Last Name</FormLabel>
                                                    <FormControl>
                                                        <Input className="border-secondary" placeholder="Enter your last name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* Email / Phone */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input className="border-secondary" type="email" placeholder="Enter your email" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="phoneNumber"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Phone Number</FormLabel>
                                                    <FormControl>
                                                        <Input className="border-secondary" placeholder="+212600112233" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* Year / Major */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="year"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Year</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="border-secondary"
                                                            type="number"
                                                            min={1}
                                                            max={8}
                                                            {...field}
                                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="major"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Major</FormLabel>
                                                    <FormControl>
                                                        <Input className="border-secondary" placeholder="Enter your major" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* Areas of Interest */}
                                    <FormField
                                        control={form.control}
                                        name="areaOfInterest"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Areas of Interest</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        onValueChange={(val) =>
                                                            field.onChange([{ id: crypto.randomUUID(), name: val }])
                                                        }
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select an area" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="AI">AI</SelectItem>
                                                            <SelectItem value="Web Development">Web Development</SelectItem>
                                                            <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        type="submit"
                                        className="w-full bg-primary hover:bg-primary/90 transition-colors duration-300"
                                    >
                                        Register
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};

export default RegisterForm;
