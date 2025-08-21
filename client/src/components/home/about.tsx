'use client';

import { Activities } from './activities';
import WhyUs from "./why-us2";

export default function About() {
    
    return (
        <section className=" mx-auto px-4 py-20 max-w-7xl" id="about">
            <Activities />
            <WhyUs />
        </section>
    );
}

