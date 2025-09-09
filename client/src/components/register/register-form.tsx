"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
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
import { fetchAreaOfInterests, AreaOfInterest } from "@/actions/getAreaOfInterests";
import { registerAction } from "@/actions/register";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import Link from "next/link";
import { toast } from "sonner";

const areaOfInterestSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(2).max(50),
});

const schema = z.object({
    id: z.string().uuid().optional(),
    firstName: z
        .string()
        .min(2, "First name must be at least 2 characters")
        .max(30, "First name must be at most 30 characters")
        .trim(),
    lastName: z
        .string()
        .min(2, "Last name must be at least 2 characters")
        .max(30, "Last name must be at most 30 characters")
        .trim(),
    email: z.string().email("Invalid email address").trim(),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    phoneNumber: z
  .string()
  .regex(/^[0-9]{10}$/, "Le numéro doit contenir exactement 10 chiffres"),

    year: z
        .number()
        .int()
        .min(1, "Year must be at least 1")
        .max(8, "Year must be at most 8"),
    major: z
        .string()
        .min(2, "Major must be at least 2 characters")
        .max(100, "Major must be at most 100 characters")
        .trim(),
    areaOfInterest: z
        .array(areaOfInterestSchema)
        .nonempty("At least one area of interest must be selected"),
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

export default function RegisterForm() {
    const [areas, setAreas] = useState<AreaOfInterest[]>([]);

    useEffect(() => {
        const loadAreas = async () => {
            const data = await fetchAreaOfInterests();
            setAreas(data);
        };
        loadAreas();
    }, []);

    const form = useForm<FormFields>({
        resolver: zodResolver(schema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            phoneNumber: "",
            year: 1,
            major: "",
            areaOfInterest: [],
        },
    });

    const onSubmit = async (values: FormFields) => {
        try {
            const response = await registerAction(values);
            toast.success("Registration successful!");
            form.reset();
            console.log("Registered successfully:", response);
        } catch (err: unknown) {
            toast.error("Registration failed. Please try again.");
            console.error("Registration error:", err);
        }
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
                    <motion.h2
                        variants={item}
                        className="from-foreground to-foreground/80 bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl"
                    >
                        Register Now
                    </motion.h2>
                    <motion.p
                        variants={item}
                        className="max-w-[800px] text-muted-foreground md:text-lg leading-relaxed"
                    >
                        Join our{" "}
                        <span className="font-medium text-foreground font-serif">
                            Code Club
                        </span>{" "}
                        today and be part of a
                        <span className="font-medium text-foreground">
                            {" "}
                            community that learns, collaborates, and builds real-world projects
                            together.
                        </span>{" "}
                        Fill this form to start your journey.
                    </motion.p>
                </motion.div>
            </div>

            {/* Form */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                <Image
                    src="/form.svg"
                    alt="student"
                    width={400}
                    height={500}
                    className="hidden md:block w-[400px] h-auto"
                />

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
                                                        <Input
                                                            className="border-secondary"
                                                            placeholder="Enter your first name"
                                                            {...field}
                                                        />
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
                                                        <Input
                                                            className="border-secondary"
                                                            placeholder="Enter your last name"
                                                            {...field}
                                                        />
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
                                                        <Input
                                                            className="border-secondary"
                                                            type="email"
                                                            placeholder="Enter your email"
                                                            {...field}
                                                        />
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
                                                        <Input
                                                            className="border-secondary"
                                                            placeholder="0611223344"
                                                            {...field}
                                                        />
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
                                                            onChange={(e) =>
                                                                field.onChange(Number(e.target.value))
                                                            }
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
                                                        <Select onValueChange={(val) => field.onChange(val)}>
                                                            <SelectTrigger className="w-full border border-secondary">
                                                                <SelectValue placeholder="Select your major" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="gi">CI GI</SelectItem>
                                                                <SelectItem value="isese">CI ISESE</SelectItem>
                                                                <SelectItem value="pic">CI PIC</SelectItem>
                                                                <SelectItem value="icp">CI ICP</SelectItem>
                                                                <SelectItem value="ibim">CI IBIM</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* Areas of Interest */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="areaOfInterest"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Areas of Interest</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={(val) => {
                                                                const area = areas.find((a) => a.name === val);
                                                                if (area)
                                                                    field.onChange([{ id: area.id, name: area.name }]);
                                                            }}
                                                        >
                                                            <SelectTrigger className=" w-full border border-secondary">
                                                                <SelectValue placeholder="Select an area" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {areas.map((area) => (
                                                                    <SelectItem key={area.id} value={area.name}>
                                                                        {area.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="border-secondary"
                                                            type="password"
                                                            placeholder="Enter your password"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="flex justify-center items-center gap-3">
                                        <Checkbox className="border-primary" id="terms" />
                                        <Label htmlFor="terms">Accept<Link className="text-secondary dark:text-primary" href="/policy">Terms of policy</Link></Label>
                                    </div>

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
}